import type { Invoice } from "../../../types/Invoice";
import StatusBadge from "./statusBadge";

const InvoiceCard = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div
      className="flex flex-col px-6 py-3.5 bg-white dark:bg-[#1E2139]
        transition-colors rounded-xl w-[80%] cursor-pointer
        md:flex-row md:items-center md:justify-evenly"
    >
      <div className="w-24 shrink-0">
        <span className="font-medium text-sm text-slate-800 dark:text-white">
          #{invoice.id}
        </span>
      </div>
      <div className="w-32 shrink-0">
        <span className="text-sm text-[#888EB0] dark:text-slate-500">
          {invoice.dueDate}
        </span>
      </div>
      <div className="flex-1">
        <span className="text-sm text-[#858BB2] dark:text-slate-500">
          {invoice.clientName}
        </span>
      </div>
      <div className="w-28 text-right shrink-0">
        <span className="font-medium text-sm text-slate-800 dark:text-white">
          £ {invoice.amount}
        </span>
      </div>
      <div className="w-28 flex justify-center shrink-0">
        <StatusBadge status={invoice.status} />
      </div>
      <div className="w-5 text-right shrink-0">
        <span className="text-slate-300 dark:text-slate-600 group-hover:text-violet-500 transition-colors text-base leading-none">
          ›
        </span>
      </div>
    </div>
  );
};

export default InvoiceCard;
