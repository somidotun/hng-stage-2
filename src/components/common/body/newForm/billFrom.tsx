import type { UseFormRegister, FieldErrors } from "react-hook-form";
import Field from "./field";
import Input from "./input";
import type { InvoiceSchema } from "../../../../schema/invoiceSchema";

type Props = {
  register: UseFormRegister<InvoiceSchema>;
  errors: FieldErrors<InvoiceSchema>;
};

const BillFrom = ({ register, errors }: Props) => (
  <section className="flex flex-col gap-5">
    <h2 className="text-sm font-bold text-[#7C5DFA]">Bill From</h2>

    <Field label="Street Address" error={errors.senderStreet?.message}>
      <Input {...register("senderStreet")} error={!!errors.senderStreet} />
    </Field>

    <div className="grid grid-cols-3 gap-4">
      <Field label="City" error={errors.senderCity?.message}>
        <Input {...register("senderCity")} error={!!errors.senderCity} />
      </Field>
      <Field label="Post Code" error={errors.senderPostcode?.message}>
        <Input
          {...register("senderPostcode")}
          error={!!errors.senderPostcode}
        />
      </Field>
      <Field label="Country" error={errors.senderCountry?.message}>
        <Input {...register("senderCountry")} error={!!errors.senderCountry} />
      </Field>
    </div>
  </section>
);

export default BillFrom;
