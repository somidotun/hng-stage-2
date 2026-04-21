import { FaPlus } from "react-icons/fa6";
import Dropdown from "../body/dropdown";
import { useEffect, useState } from "react";
import { getInvoices } from "../../../services/invoiceServices";
import type { Invoice } from "../../../types/Invoice";
import useFilterStore from "../../../store/fieldState";

const Nav = () => {
  const { activeStatus } = useFilterStore();

  const [invoicesNum, setInvoicesNum] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <section
      className="md:px-20 flex  justify-between
      py-3.5
     lg:justify-center lg:gap-72 w-full"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-grey-900 dark:text-white mb-2">
          Invoices
        </h1>
        <p className="text-grey-500 dark:text-white">
          {filtered.length === 0
            ? `There are no invoice`
            : `There are ${filtered.length} total invoices`}
        </p>
      </div>

      <div className="flex items-center justify-between gap-20 mb-8">
        <div>
          {/* the dropdown function */}
          <Dropdown />
        </div>

        {/* add new invoice */}
        <button
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#7C5DFA] 
        text-white font-semibold shadow-lg hover:bg-[#9277FF] transition-all duration-200"
        >
          <FaPlus size={20} />
          New Invoice
        </button>
      </div>
    </section>
  );
};

export default Nav;
