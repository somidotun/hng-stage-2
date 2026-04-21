import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Invoice } from "../types/Invoice";

type status = "draft" | "pending" | "paid";

type FieldState = {
  // filter
  activeStatus: status | null;
  toggleState: (status: status) => void;
  isActive: (status: status) => boolean;

  // invoices
  invoices: Invoice[];
  setInvoices: (invoices: Invoice[]) => void;

  // derived
  filteredInvoices: () => Invoice[];
  count: () => number;
};

const DEACTIVATION_ORDER: Record<status, status | null> = {
  pending: null,
  draft: "pending",
  paid: null,
};

const useFilterStore = create<FieldState>()(
  persist(
    (set, get) => ({
      // filter
      activeStatus: null,

      toggleState: (status) =>
        set((store) => {
          if (store.activeStatus === status) return { activeStatus: null };

          const mustDeactivate = DEACTIVATION_ORDER[status];
          if (mustDeactivate && store.activeStatus === mustDeactivate) {
            return { activeStatus: null };
          }

          return { activeStatus: status };
        }),

      isActive: (status) => get().activeStatus === status,

      // invoices
      invoices: [],

      setInvoices: (invoices) => set({ invoices }),

      // derived — call these like functions: filteredInvoices()
      filteredInvoices: () => {
        const { invoices, activeStatus } = get();
        if (!activeStatus) return invoices;
        return invoices.filter((inv) => inv.status === activeStatus);
      },

      count: () => {
        const { filteredInvoices } = get();
        return filteredInvoices().length;
      },
    }),
    { name: "field-storage" },
  ),
);

export default useFilterStore;
