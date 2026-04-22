import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Invoice } from "../../../types/Invoice";
import {
  invoiceSchema,
  type InvoiceSchema,
} from "../../../schema/invoiceSchema";
import { getStoredInvoices, saveInvoices } from "../../../libs/storage";
import BillFrom from "./newForm/billFrom";
import BillTo from "./newForm/billTo";
import InvoiceMeta from "./newForm/invoiceMeta";
import ItemList from "./newForm/itemList";

const generateId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  return (
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)] +
    digits[Math.floor(Math.random() * 10)] +
    digits[Math.floor(Math.random() * 10)] +
    digits[Math.floor(Math.random() * 10)] +
    digits[Math.floor(Math.random() * 10)]
  );
};

const NewInvoice = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InvoiceSchema>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      paymentTerms: "Net 30 Days",
      items: [{ name: "", quantity: 1, price: 0, total: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const watchedItems = watch("items");

  useEffect(() => {
    watchedItems?.forEach((item, index) => {
      const total = (Number(item.quantity) || 0) * (Number(item.price) || 0);
      setValue(`items.${index}.total`, total);
    });
  }, [watchedItems, setValue]);

  const buildInvoice = (
    data: InvoiceSchema,
    status: "draft" | "pending",
  ): Invoice => ({
    id: generateId(),
    description: data.description,
    invoiceDate: data.invoiceDate,
    paymentDue: data.invoiceDate,
    status,
    senderAddress: {
      street: data.senderStreet,
      city: data.senderCity,
      postcode: data.senderPostcode,
      country: data.senderCountry,
    },
    billTo: {
      name: data.clientName,
      address: {
        street: data.clientStreet,
        city: data.clientCity,
        postcode: data.clientPostcode,
        country: data.clientCountry,
      },
    },
    sentTo: data.clientEmail,
    items: data.items,
    amountDue: data.items.reduce((sum, item) => sum + item.total, 0),
  });

  const saveAndNavigate = (invoice: Invoice) => {
    const existing = getStoredInvoices();
    saveInvoices([...existing, invoice]);
    onClose();
    navigate(`/invoice/${invoice.id}`);
  };

  const handleDraft = () => {
    const data = watch();
    const invoice = buildInvoice(
      {
        senderStreet: data.senderStreet || "",
        senderCity: data.senderCity || "",
        senderPostcode: data.senderPostcode || "",
        senderCountry: data.senderCountry || "",
        clientName: data.clientName || "",
        clientEmail: data.clientEmail || "",
        clientStreet: data.clientStreet || "",
        clientCity: data.clientCity || "",
        clientPostcode: data.clientPostcode || "",
        clientCountry: data.clientCountry || "",
        invoiceDate: data.invoiceDate || "",
        paymentTerms: data.paymentTerms || "",
        description: data.description || "",
        items: data.items || [],
      },
      "draft",
    );
    saveAndNavigate(invoice);
  };

  const onSubmit = (data: InvoiceSchema) => {
    saveAndNavigate(buildInvoice(data, "pending"));
  };

  return (
    <div className="fixed inset-0 z-30 flex pt-16 lg:pt-0 lg:pl-[80px]">
      {/* form panel */}
      <div className="w-full md:w-3/4 h-full bg-[#F8F8FB] dark:bg-[#141625] overflow-y-auto">
        <div className="max-w-[600px] px-6 py-10 mx-auto">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">
            New Invoice
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            <BillFrom register={register} errors={errors} />
            <BillTo register={register} errors={errors} />
            <InvoiceMeta register={register} errors={errors} />
            <ItemList
              register={register}
              errors={errors}
              fields={fields}
              watchedItems={watchedItems}
              append={append}
              remove={remove}
            />

            {/* actions */}
            <div className="flex items-center justify-between pb-10">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-4 rounded-full text-sm font-bold
                  text-[#7E88C3] dark:text-[#DFE3FA]
                  bg-[#F9FAFE] dark:bg-[#252945] hover:bg-[#DFE3FA] transition-colors"
              >
                Discard
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDraft}
                  className="px-6 py-4 rounded-full text-sm font-bold
                    text-[#888EB0] dark:text-[#DFE3FA]
                    bg-[#373B53] dark:bg-[#252945]
                    hover:bg-[#0C0E16] transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-4 rounded-full text-sm font-bold
                    text-white bg-[#7C5DFA] hover:bg-[#9277FF] transition-colors"
                >
                  Save & Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* dark overlay */}
      <div
        onClick={onClose}
        className="hidden md:block md:w-1/4 h-full bg-black/60 cursor-pointer"
      />
    </div>
  );
};

export default NewInvoice;
