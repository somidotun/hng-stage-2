import type { UseFormRegister, FieldErrors } from "react-hook-form";
import Field from "./field";
import Input from "./input";
import SelectField from "./selectField";
import type { InvoiceSchema } from "../../../../schema/invoiceSchema";

type Props = {
  register: UseFormRegister<InvoiceSchema>;
  errors: FieldErrors<InvoiceSchema>;
};

const InvoiceMeta = ({ register, errors }: Props) => (
  <section className="flex flex-col gap-5">
    <div className="grid grid-cols-2 gap-4">
      <Field label="Invoice Date" error={errors.invoiceDate?.message}>
        <Input {...register("invoiceDate")} error={!!errors.invoiceDate} />
      </Field>
      <Field label="Payment Terms" error={errors.paymentTerms?.message}>
        <SelectField
          {...register("paymentTerms")}
          error={!!errors.paymentTerms}
        >
          <option>Net 1 Day</option>
          <option>Net 7 Days</option>
          <option>Net 14 Days</option>
          <option>Net 30 Days</option>
        </SelectField>
      </Field>
    </div>

    <Field label="Project Description" error={errors.description?.message}>
      <Input
        {...register("description")}
        placeholder="e.g. Graphic Design Service"
        error={!!errors.description}
      />
    </Field>
  </section>
);

export default InvoiceMeta;
