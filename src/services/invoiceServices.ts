import api from "../libs/axios";
import type { Invoice } from "../types/Invoice";

export const getInvoices = async (): Promise<Invoice[]> => {
  const response = await api.get("/src/data/data.json");
  return response.data;
};
