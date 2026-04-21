import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import useFilterStore from "../../../store/fieldState";
import type { Invoice } from "../../../types/Invoice";
import { getInvoices } from "../../../services/invoiceServices";

type status = "draft" | "pending" | "paid";

const Dropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const statuses: status[] = ["draft", "pending", "paid"];

  const { toggleState, isActive, activeStatus } = useFilterStore();

  const [invoicesNum, setInvoicesNum] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filtered = activeStatus
    ? invoicesNum.filter((inv) => inv.status === activeStatus)
    : invoicesNum;

  const isDisabled = filtered.length === 0;

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoicesNum(data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative">
      {isDisabled ? (
        <button
          onClick={() => setOpen((prev) => !prev)}
          disabled={isDisabled}
          className={`flex items-center gap-2 font-semibold transition-colors text-sm md:text-base  dark:text-white
           
             
          ${
            isDisabled
              ? "text-slate-300 dark:text-slate-600 cursor-not-allowed"
              : "text-slate-700 dark:text-white hover:cursor-pointer"
          }`}
        >
          <span className="hidden md:inline ">Filter by status</span>
          <span className="md:hidden">Filter</span>
          <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <MdOutlineKeyboardArrowDown />
          </span>
        </button>
      ) : (
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`flex items-center gap-2 font-semibold transition-colors text-sm md:text-base hover:cursor-pointer dark:text-white
         `}
        >
          <span className="hidden md:inline">Filter by status</span>
          <span className="md:hidden">Filter</span>
          <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <MdOutlineKeyboardArrowDown />
          </span>
        </button>
      )}

      {open && !isDisabled && (
        <div
          className="absolute top-10 left-0 bg-white dark:bg-[#252945] rounded-xl shadow-xl 
            p-5 min-w-[180px] z-30"
        >
          {statuses.map((status) => (
            <label
              key={status}
              className="flex items-center gap-3 py-1.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={isActive(status)}
                onChange={() => toggleState(status)}
                className="w-4 h-4 accent-[#7C5DFA] cursor-pointer"
              />
              <span
                className="capitalize font-medium text-sm text-slate-700 dark:text-white
                  group-hover:text-[#7C5DFA] dark:group-hover:text-[#7C5DFA] transition-colors"
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
