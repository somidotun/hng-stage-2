export type Invoice = {
  id: string;
  dueDate: string;
  clientName: string;
  amount: number;
  status: "draft" | "pending" | "paid";
};
