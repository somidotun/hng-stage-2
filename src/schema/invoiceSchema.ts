// schemas/invoiceSchema.ts
import { z } from "zod";

const itemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  quantity: z.number().min(1, "Qty must be at least 1"),
  price: z.number().min(0, "Price must be positive"),
  total: z.number(),
});

export const invoiceSchema = z.object({
  senderStreet: z.string().min(1, "Street address is required"),
  senderCity: z.string().min(1, "City is required"),
  senderPostcode: z.string().min(1, "Post code is required"),
  senderCountry: z.string().min(1, "Country is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid email address"),
  clientStreet: z.string().min(1, "Street address is required"),
  clientCity: z.string().min(1, "City is required"),
  clientPostcode: z.string().min(1, "Post code is required"),
  clientCountry: z.string().min(1, "Country is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  paymentTerms: z.string().min(1, "Payment terms is required"),
  description: z.string().min(1, "Project description is required"),
  items: z.array(itemSchema).min(1, "At least one item is required"),
});

export type InvoiceSchema = z.infer<typeof invoiceSchema>;
