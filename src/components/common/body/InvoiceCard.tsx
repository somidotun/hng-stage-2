import { useNavigate } from "react-router-dom";
import type { Invoice } from "../../../types/Invoice";
import StatusBadge from "./statusBadge";

const InvoiceCard = ({ invoice }: { invoice: Invoice }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/invoice/${invoice.id}`)}
      className="flex flex-col px-6 py-5 bg-white dark:bg-[#1E2139]
        transition-colors rounded-xl w-[90%] cursor-pointer
        md:flex-row md:items-center md:justify-between"
    >
      {/* mobile layout */}
      <div className="flex flex-col gap-4 md:contents">
        {/* row 1 — ID + client name */}
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm text-slate-800 dark:text-white">
            <span className="text-[#7C5DFA]">#</span>
            {invoice.id}
          </span>
          <span className="text-sm text-[#858BB2] dark:text-slate-400 md:hidden">
            {invoice.billTo.name}
          </span>
        </div>

        {/* row 2 — due date + amount + badge */}
        <div className="flex justify-between items-end  md:hidden">
          {/* left: due date + amount */}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-[#888EB0] dark:text-slate-500">
              Due {invoice.paymentDue}
            </span>
            <span className="font-bold text-base text-slate-800 dark:text-white">
              £ {invoice.amountDue.toFixed(2)}
            </span>
          </div>

          {/* right: badge */}
          <div className="md:hidden">
            <StatusBadge status={invoice.status} />
          </div>
        </div>
      </div>

      {/* desktop-only: client name, badge, chevron */}
      <div className="md:flex md:flex-row md:justify-between md:w-[80%]">
        <div className="hidden md:block w-32 shrink-0">
          <span className="text-sm text-[#888EB0] dark:text-slate-500">
            {invoice.invoiceDate}
          </span>
        </div>
        <div className="hidden md:block flex-1">
          <span className="text-sm text-[#858BB2] dark:text-slate-500">
            {invoice.billTo.name}
          </span>
        </div>
        <div className="hidden md:block w-28 text-right shrink-0">
          <span className="font-medium text-sm text-slate-800 dark:text-white">
            £ {invoice.amountDue.toFixed(2)}
          </span>
        </div>
        <div className="hidden md:flex w-28 justify-center shrink-0">
          <StatusBadge status={invoice.status} />
        </div>
        <div className="hidden md:block w-5 text-right shrink-0">
          <span className="text-[#7C5DFA] text-base leading-none">›</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
