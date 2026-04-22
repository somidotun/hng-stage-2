import api from "../libs/axios";
import { getStoredInvoices, saveInvoices } from "../libs/storage";
import type { Invoice } from "../types/Invoice";

export const getInvoices = async (): Promise<Invoice[]> => {
  const stored = getStoredInvoices();

  // if localStorage has data, use it
  if (stored.length > 0) return stored;

  // otherwise fetch from data.json and seed localStorage
  const response = await api.get("/data.json");
  const invoices: Invoice[] = response.data.invoices;
  saveInvoices(invoices);
  return invoices;
};
