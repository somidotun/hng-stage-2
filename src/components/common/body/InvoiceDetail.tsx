import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Invoice } from "../../../types/Invoice";
import { getInvoices } from "../../../services/invoiceServices";
import StatusBadge from "./statusBadge";

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getInvoices();
        const found = data.find((inv) => inv.id === id) ?? null;
        setInvoice(found);
      } catch {
        setError("Failed to load invoice");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!invoice) return <p className="text-center mt-10">Invoice not found</p>;

  return (
    <div className="min-h-screen bg-[#F8F8FB] dark:bg-[#141625] px-6 py-10">
      <div className="max-w-[730px] mx-auto flex flex-col gap-4">
        {/* Go Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-sm font-bold text-slate-800
            dark:text-white hover:text-[#7C5DFA] transition-colors w-fit"
        >
          <span className="text-[#7C5DFA]">‹</span> Go back
        </button>

        {/* Status Bar — mobile: status only, desktop: status + buttons */}
        <div
          className="flex items-center justify-between bg-white dark:bg-[#1E2139]
          rounded-xl px-8 py-5 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#858BB2] dark:text-[#DFE3FA]">
              Status
            </span>
            <StatusBadge status={invoice.status} />
          </div>

          {/* buttons hidden on mobile — shown at bottom instead */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate(`/invoice/${invoice.id}/edit`)}
              className="px-6 py-3 rounded-full text-sm font-bold
                text-[#7C5DFA] bg-[#F9FAFE] dark:bg-[#252945]
                hover:bg-[#DFE3FA] transition-colors hover:cursor-pointer"
            >
              Edit
            </button>
            <button
              className="px-6 py-3 rounded-full text-sm font-bold
              text-white bg-[#EC5757] hover:bg-[#FF9797] transition-colors hover:cursor-pointer"
            >
              Delete
            </button>
            <button
              className="px-6 py-3 rounded-full text-sm font-bold
              text-white bg-[#7C5DFA] hover:bg-[#9277FF] transition-colors hover:cursor-pointer"
            >
              Mark as Paid
            </button>
          </div>
        </div>

        {/* Invoice Body */}
        <div
          className="bg-white dark:bg-[#1E2139] rounded-xl px-6 md:px-8 py-8 md:py-10
          shadow-sm flex flex-col gap-8"
        >
          {/* Top: ID + Sender Address */}
          {/* mobile: stacked, desktop: side by side */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <p className="font-bold text-slate-800 dark:text-white">
                <span className="text-[#7C5DFA]">#</span>
                {invoice.id}
              </p>
              <p className="text-sm text-[#7E88C3] dark:text-[#DFE3FA]">
                {invoice.description}
              </p>
            </div>
            {/* mobile: left aligned, desktop: right aligned */}
            <div className="text-left md:text-right text-sm text-[#7E88C3] dark:text-[#DFE3FA]">
              <p>{invoice.senderAddress.street}</p>
              <p>{invoice.senderAddress.city}</p>
              <p>{invoice.senderAddress.postcode}</p>
              <p>{invoice.senderAddress.country}</p>
            </div>
          </div>

          {/* Dates + Bill To + Sent To */}
          {/* mobile: 2 col grid with sent to below, desktop: 3 col grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm text-[#7E88C3] dark:text-[#DFE3FA] mb-1">
                  Invoice Date
                </p>
                <p className="font-bold text-slate-800 dark:text-white">
                  {invoice.invoiceDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#7E88C3] dark:text-[#DFE3FA] mb-1">
                  Payment Due
                </p>
                <p className="font-bold text-slate-800 dark:text-white">
                  {invoice.paymentDue}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-[#7E88C3] dark:text-[#DFE3FA] mb-1">
                Bill To
              </p>
              <p className="font-bold text-slate-800 dark:text-white mb-2">
                {invoice.billTo.name}
              </p>
              <p className="text-sm text-[#7E88C3] dark:text-[#DFE3FA]">
                {invoice.billTo.address.street}
              </p>
              <p className="text-sm text-[#7E88C3] dark:text-[#DFE3FA]">
                {invoice.billTo.address.city}
              </p>
              <p className="text-sm text-[#7E88C3] dark:text-[#DFE3FA]">
                {invoice.billTo.address.postcode}
              </p>
              <p className="text-sm text-[#7E88C3] dark:text-[#DFE3FA]">
                {invoice.billTo.address.country}
              </p>
            </div>

            {/* Sent To — spans full width on mobile, normal col on desktop */}
            <div className="col-span-2 md:col-span-1">
              <p className="text-sm text-[#7E88C3] dark:text-[#DFE3FA] mb-1">
                Sent to
              </p>
              <p className="font-bold text-slate-800 dark:text-white">
                {invoice.sentTo}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-[#F9FAFE] dark:bg-[#252945] rounded-xl overflow-hidden">
            {/* desktop table header — hidden on mobile */}
            <div
              className="hidden md:grid grid-cols-5 px-8 py-4
              text-sm text-[#7E88C3] dark:text-[#DFE3FA]"
            >
              <span className="col-span-2">Item Name</span>
              <span className="text-center">QTY.</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>

            {/* rows */}
            <div className="flex flex-col gap-4 px-6 md:px-8 py-6">
              {invoice.items.map((item) => (
                <div key={item.name}>
                  {/* mobile row layout */}
                  <div className="flex justify-between items-center md:hidden">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-slate-800 dark:text-white">
                        {item.name}
                      </span>
                      <span className="text-sm font-bold text-[#7E88C3] dark:text-[#DFE3FA]">
                        {item.quantity} x £ {item.price.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-white">
                      £ {item.total.toFixed(2)}
                    </span>
                  </div>

                  {/* desktop row layout */}
                  <div
                    className="hidden md:grid grid-cols-5 items-center
                    text-sm font-bold text-slate-800 dark:text-white"
                  >
                    <span className="col-span-2">{item.name}</span>
                    <span className="text-center text-[#7E88C3] dark:text-[#DFE3FA]">
                      {item.quantity}
                    </span>
                    <span className="text-right text-[#7E88C3] dark:text-[#DFE3FA]">
                      £ {item.price.toFixed(2)}
                    </span>
                    <span className="text-right">
                      £ {item.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Amount Due — "Grand Total" on mobile */}
            <div
              className="bg-[#373B53] dark:bg-[#0C0E16] rounded-b-xl px-6 md:px-8 py-6
              flex items-center justify-between"
            >
              <span className="text-sm text-white">
                <span className="md:hidden">Grand Total</span>
                <span className="hidden md:inline">Amount Due</span>
              </span>
              <span className="text-2xl font-bold text-white">
                £ {invoice.amountDue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* mobile bottom action bar — hidden on desktop */}
        <div
          className="flex md:hidden items-center justify-between
          bg-white dark:bg-[#1E2139] rounded-xl px-6 py-5 shadow-sm mt-2"
        >
          <button
            onClick={() => navigate(`/invoice/${invoice.id}/edit`)}
            className="text-sm font-bold text-[#7E88C3] hover:text-[#7C5DFA]
              transition-colors hover:cursor-pointer"
          >
            Edit
          </button>
          <button
            className="px-6 py-3 rounded-full text-sm font-bold
            text-white bg-[#EC5757] hover:bg-[#FF9797] transition-colors"
          >
            Delete
          </button>
          <button
            className="px-6 py-3 rounded-full text-sm font-bold
            text-white bg-[#7C5DFA] hover:bg-[#9277FF] transition-colors"
          >
            Mark as Paid
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
