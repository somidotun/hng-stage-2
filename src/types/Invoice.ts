// types/Invoice.ts

export type Status = "draft" | "pending" | "paid";

export type Address = {
  street: string;
  city: string;
  postcode: string;
  country: string;
};

export type Item = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type BillTo = {
  name: string;
  address: Address;
};

export type Invoice = {
  id: string;
  description: string;
  invoiceDate: string;
  paymentDue: string;
  status: Status;
  billTo: BillTo;
  sentTo: string;
  senderAddress: Address;
  items: Item[];
  amountDue: number;
};

export type InvoiceFormData = {
  senderStreet: string;
  senderCity: string;
  senderPostcode: string;
  senderCountry: string;
  clientName: string;
  clientEmail: string;
  clientStreet: string;
  clientCity: string;
  clientPostcode: string;
  clientCountry: string;
  invoiceDate: string;
  paymentTerms: string;
  description: string;
  items: Item[];
};
