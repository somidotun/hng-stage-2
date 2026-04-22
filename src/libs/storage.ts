import type { Invoice } from "../types/Invoice";

const STORAGE_KEY = "invoices";

export const getStoredInvoices = (): Invoice[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveInvoices = (invoices: Invoice[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
};

export const updateInvoice = (id: string, updated: Partial<Invoice>): void => {
  const invoices = getStoredInvoices();
  const index = invoices.findIndex((inv) => inv.id === id);
  if (index !== -1) {
    invoices[index] = { ...invoices[index], ...updated };
    saveInvoices(invoices);
  }
};
