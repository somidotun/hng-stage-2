import { FaPlus } from "react-icons/fa6";
import Dropdown from "../body/dropdown";
import { useEffect, useState } from "react";
import { getInvoices } from "../../../services/invoiceServices";
import type { Invoice } from "../../../types/Invoice";
import useFilterStore from "../../../store/fieldState";
import NewInvoice from "../body/newInvoice";

const Nav = () => {
  const { activeStatus } = useFilterStore();
  const [invoicesNum, setInvoicesNum] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const filtered = activeStatus
    ? invoicesNum.filter((inv) => inv.status === activeStatus)
    : invoicesNum;

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
    <>
      {/* new invoice overlay */}
      {showNew && <NewInvoice onClose={() => setShowNew(false)} />}

      <section
        className="flex items-center justify-between px-6 py-3.5
        md:px-20 lg:justify-center lg:gap-72 w-full"
      >
        {/* title + subtitle */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-grey-900 dark:text-white mb-1">
            Invoices
          </h1>
          <p className="text-xs md:text-sm text-grey-500 dark:text-white">
            {/* mobile: "7 invoices" — desktop: "There are 7 total invoices" */}
            <span className="md:hidden">
              {filtered.length} invoice{filtered.length !== 1 ? "s" : ""}
            </span>
            <span className="hidden md:inline">
              {filtered.length === 0
                ? "There are no invoices"
                : `There are ${filtered.length} total invoices`}
            </span>
          </p>
        </div>

        {/* filter + new button */}
        <div className="flex items-center gap-4 md:gap-20 mb-8">
          <Dropdown />

          {/* mobile: circle + "New" — desktop: pill + "New Invoice" */}
          <button
            className="flex items-center gap-2 md:gap-3 bg-[#7C5DFA] hover:bg-[#9277FF]
            transition-all duration-200 text-white font-semibold shadow-lg hover:cursor-pointer
            rounded-full px-2 py-2 md:px-6 md:py-3"
            onClick={() => setShowNew(true)}
          >
            <span className="bg-white rounded-full p-1.5 flex items-center justify-center">
              <FaPlus size={10} className="text-[#7C5DFA]" />
            </span>
            {/* mobile: "New" — desktop: "New Invoice" */}
            <span className="pr-2 md:hidden text-sm">New</span>
            <span className="hidden md:inline">New Invoice</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Nav;
