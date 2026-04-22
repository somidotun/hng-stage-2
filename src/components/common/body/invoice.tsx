import { useEffect, useState } from "react";
import { getInvoices } from "../../../services/invoiceServices";
import type { Invoice } from "../../../types/Invoice";
import useFilterStore from "../../../store/fieldState";
import EmptyEmail from "./emptyEmail";
import InvoiceCard from "./InvoiceCard";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { activeStatus } = useFilterStore();

  const filtered = activeStatus
    ? invoices.filter((inv) => inv.status === activeStatus)
    : invoices;

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoices(data);
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
    <div className="flex flex-col gap-5 items-center w-[100%]">
      {filtered.length === 0 ? (
        <EmptyEmail />
      ) : (
        filtered.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))
      )}
    </div>
  );
};

export default InvoiceList;
