import type { UseFormRegister, FieldErrors } from "react-hook-form";
import Field from "./field";
import Input from "./input";
import type { InvoiceSchema } from "../../../../schema/invoiceSchema";

type Props = {
  register: UseFormRegister<InvoiceSchema>;
  errors: FieldErrors<InvoiceSchema>;
};

const BillTo = ({ register, errors }: Props) => (
  <section className="flex flex-col gap-5">
    <h2 className="text-sm font-bold text-[#7C5DFA]">Bill To</h2>

    <Field label="Client's Name" error={errors.clientName?.message}>
      <Input
        {...register("clientName")}
        placeholder="e.g. Alex Grim"
        error={!!errors.clientName}
      />
    </Field>

    <Field label="Client's Email" error={errors.clientEmail?.message}>
      <Input
        {...register("clientEmail")}
        type="email"
        placeholder="e.g. email@example.com"
        error={!!errors.clientEmail}
      />
    </Field>

    <Field label="Street Address" error={errors.clientStreet?.message}>
      <Input {...register("clientStreet")} error={!!errors.clientStreet} />
    </Field>

    <div className="grid grid-cols-3 gap-4">
      <Field label="City" error={errors.clientCity?.message}>
        <Input {...register("clientCity")} error={!!errors.clientCity} />
      </Field>
      <Field label="Post Code" error={errors.clientPostcode?.message}>
        <Input
          {...register("clientPostcode")}
          error={!!errors.clientPostcode}
        />
      </Field>
      <Field label="Country" error={errors.clientCountry?.message}>
        <Input {...register("clientCountry")} error={!!errors.clientCountry} />
      </Field>
    </div>
  </section>
);

export default BillTo;
