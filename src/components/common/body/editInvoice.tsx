import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getInvoices } from "../../../services/invoiceServices";
import type { Invoice } from "../../../types/Invoice";
import {
  invoiceSchema,
  type InvoiceSchema,
} from "../../../schema/invoiceSchema";
import { updateInvoice } from "../../../libs/storage";

const Field = ({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <div className="flex justify-between">
      <label className="text-xs text-[#7E88C3] dark:text-[#DFE3FA]">
        {label}
      </label>
      {error && <span className="text-xs text-[#EC5757]">{error}</span>}
    </div>
    {children}
  </div>
);

const Input = ({
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) => (
  <input
    {...props}
    className={`w-full px-4 py-3 rounded-md border text-sm font-bold
      text-slate-800 dark:text-white bg-white dark:bg-[#1E2139]
      focus:outline-none focus:border-[#7C5DFA] transition-colors
      ${error ? "border-[#EC5757]" : "border-[#DFE3FA] dark:border-[#252945]"}`}
  />
);

const EditInvoice = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InvoiceSchema>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: { items: [{ name: "", quantity: 1, price: 0, total: 0 }] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const watchedItems = watch("items");

  // auto-calculate totals
  useEffect(() => {
    watchedItems?.forEach((item, index) => {
      const total = (Number(item.quantity) || 0) * (Number(item.price) || 0);
      setValue(`items.${index}.total`, total);
    });
  }, [watchedItems, setValue]);

  // load invoice into form
  useEffect(() => {
    const load = async () => {
      const data = await getInvoices();
      const invoice: Invoice | undefined = data.find((inv) => inv.id === id);
      if (!invoice) return;
      reset({
        senderStreet: invoice.senderAddress.street,
        senderCity: invoice.senderAddress.city,
        senderPostcode: invoice.senderAddress.postcode,
        senderCountry: invoice.senderAddress.country,
        clientName: invoice.billTo.name,
        clientEmail: invoice.sentTo,
        clientStreet: invoice.billTo.address.street,
        clientCity: invoice.billTo.address.city,
        clientPostcode: invoice.billTo.address.postcode,
        clientCountry: invoice.billTo.address.country,
        invoiceDate: invoice.invoiceDate,
        paymentTerms: "Net 30 Days",
        description: invoice.description,
        items: invoice.items,
      });
    };
    load();
  }, [id, reset]);

  const onSubmit = (data: InvoiceSchema) => {
    // build updated invoice shape
    const updated: Partial<Invoice> = {
      description: data.description,
      invoiceDate: data.invoiceDate,
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
    };

    // save to localStorage
    updateInvoice(id!, updated);

    navigate(`/invoice/${id}`);
  };

  return (
    // overlay wrapper — full screen with dark backdrop
    <div className="fixed inset-0 z-30 flex pt-16 lg:pt-0 lg:pl-[80px]">
      {/* form panel — 75% width */}
      <div
        className="w-full md:w-3/4 h-full rounded-3xl bg-[#F8F8FB] dark:bg-[#141625]
          overflow-y-auto pt-16 lg:pl-[80px]"
      >
        <div className="max-w-[600px] px-6 py-10 mx-auto">
          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">
            Edit <span className="text-[#888EB0]">#</span>
            {id}
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            {/* Bill From */}
            <section className="flex flex-col gap-5">
              <h2 className="text-sm font-bold text-[#7C5DFA]">Bill From</h2>
              <Field
                label="Street Address"
                error={errors.senderStreet?.message}
              >
                <Input
                  {...register("senderStreet")}
                  error={!!errors.senderStreet}
                />
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field label="City" error={errors.senderCity?.message}>
                  <Input
                    {...register("senderCity")}
                    error={!!errors.senderCity}
                  />
                </Field>
                <Field label="Post Code" error={errors.senderPostcode?.message}>
                  <Input
                    {...register("senderPostcode")}
                    error={!!errors.senderPostcode}
                  />
                </Field>
                <Field label="Country" error={errors.senderCountry?.message}>
                  <Input
                    {...register("senderCountry")}
                    error={!!errors.senderCountry}
                  />
                </Field>
              </div>
            </section>

            {/* Bill To */}
            <section className="flex flex-col gap-5">
              <h2 className="text-sm font-bold text-[#7C5DFA]">Bill To</h2>
              <Field label="Client's Name" error={errors.clientName?.message}>
                <Input
                  {...register("clientName")}
                  error={!!errors.clientName}
                />
              </Field>
              <Field label="Client's Email" error={errors.clientEmail?.message}>
                <Input
                  {...register("clientEmail")}
                  type="email"
                  error={!!errors.clientEmail}
                />
              </Field>
              <Field
                label="Street Address"
                error={errors.clientStreet?.message}
              >
                <Input
                  {...register("clientStreet")}
                  error={!!errors.clientStreet}
                />
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field label="City" error={errors.clientCity?.message}>
                  <Input
                    {...register("clientCity")}
                    error={!!errors.clientCity}
                  />
                </Field>
                <Field label="Post Code" error={errors.clientPostcode?.message}>
                  <Input
                    {...register("clientPostcode")}
                    error={!!errors.clientPostcode}
                  />
                </Field>
                <Field label="Country" error={errors.clientCountry?.message}>
                  <Input
                    {...register("clientCountry")}
                    error={!!errors.clientCountry}
                  />
                </Field>
              </div>
            </section>

            {/* Dates + Terms + Description */}
            <section className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Invoice Date" error={errors.invoiceDate?.message}>
                  <Input
                    {...register("invoiceDate")}
                    error={!!errors.invoiceDate}
                  />
                </Field>
                <Field
                  label="Payment Terms"
                  error={errors.paymentTerms?.message}
                >
                  <select
                    {...register("paymentTerms")}
                    className={`w-full px-4 py-3 rounded-md border text-sm font-bold
                      text-slate-800 dark:text-white bg-white dark:bg-[#1E2139]
                      focus:outline-none focus:border-[#7C5DFA] transition-colors
                      ${
                        errors.paymentTerms
                          ? "border-[#EC5757]"
                          : "border-[#DFE3FA] dark:border-[#252945]"
                      }`}
                  >
                    <option>Net 1 Day</option>
                    <option>Net 7 Days</option>
                    <option>Net 14 Days</option>
                    <option>Net 30 Days</option>
                  </select>
                </Field>
              </div>
              <Field
                label="Project Description"
                error={errors.description?.message}
              >
                <Input
                  {...register("description")}
                  error={!!errors.description}
                />
              </Field>
            </section>

            {/* Item List */}
            <section className="flex flex-col gap-5">
              <h2 className="text-lg font-bold text-[#777F98]">Item List</h2>
              <div className="grid grid-cols-12 gap-3 text-xs text-[#7E88C3]">
                <span className="col-span-5">Item Name</span>
                <span className="col-span-2 text-center">Qty.</span>
                <span className="col-span-2 text-right">Price</span>
                <span className="col-span-2 text-right">Total</span>
                <span />
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-12 gap-3 items-center"
                >
                  <div className="col-span-5">
                    <Input
                      {...register(`items.${index}.name`)}
                      placeholder="Item name"
                      error={!!errors.items?.[index]?.name}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      {...register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      type="number"
                      error={!!errors.items?.[index]?.quantity}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      {...register(`items.${index}.price`, {
                        valueAsNumber: true,
                      })}
                      type="number"
                      step="0.01"
                      error={!!errors.items?.[index]?.price}
                    />
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-sm font-bold text-[#888EB0]">
                      {(
                        (Number(watchedItems?.[index]?.quantity) || 0) *
                        (Number(watchedItems?.[index]?.price) || 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-[#888EB0] hover:text-[#EC5757] transition-colors"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  append({ name: "", quantity: 1, price: 0, total: 0 })
                }
                className="w-full py-4 rounded-full text-sm font-bold
                  text-[#7E88C3] dark:text-[#DFE3FA]
                  bg-[#F9FAFE] dark:bg-[#252945]
                  hover:bg-[#DFE3FA] dark:hover:bg-[#0C0E16] transition-colors"
              >
                + Add New Item
              </button>
            </section>

            {/* Actions */}
            <div className="flex justify-end gap-3 pb-10">
              <button
                type="button"
                onClick={() => navigate(`/invoice/${id}`)}
                className="px-6 py-4 rounded-full text-sm font-bold hover:cursor-pointer
                  text-[#7E88C3] dark:text-[#ffff]
                  bg-[#F9FAFE] dark:bg-[#252945]
                  hover:bg-black transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-4 rounded-full text-sm font-bold hover:cursor-pointer
                  text-white bg-[#7C5DFA] hover:bg-[#9277FF] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* dark overlay — remaining 25% */}
      <div
        onClick={() => navigate(`/invoice/${id}`)}
        className="hidden md:block md:w-1/4 h-full bg-[#00000032] dark:bg-[#0000005c] cursor-pointer"
      />
    </div>
  );
};

export default EditInvoice;
