import type {
  UseFormRegister,
  FieldErrors,
  UseFieldArrayRemove,
  UseFieldArrayAppend,
} from "react-hook-form";
import type { FieldArrayWithId } from "react-hook-form";
import type { InvoiceSchema } from "../../../../schema/invoiceSchema";
import Input from "./input";

type Props = {
  register: UseFormRegister<InvoiceSchema>;
  errors: FieldErrors<InvoiceSchema>;
  fields: FieldArrayWithId<InvoiceSchema, "items">[];
  watchedItems: InvoiceSchema["items"];
  append: UseFieldArrayAppend<InvoiceSchema, "items">;
  remove: UseFieldArrayRemove;
};

const ItemList = ({
  register,
  errors,
  fields,
  watchedItems,
  append,
  remove,
}: Props) => (
  <section className="flex flex-col gap-5">
    <h2 className="text-lg font-bold text-[#777F98]">Item List</h2>

    {/* header */}
    <div className="grid grid-cols-12 gap-3 text-xs text-[#7E88C3]">
      <span className="col-span-5">Item Name</span>
      <span className="col-span-2 text-center">Qty.</span>
      <span className="col-span-2 text-right">Price</span>
      <span className="col-span-2 text-right">Total</span>
      <span />
    </div>

    {/* rows */}
    {fields.map((field, index) => (
      <div key={field.id} className="grid grid-cols-12 gap-3 items-center">
        <div className="col-span-5">
          <Input
            {...register(`items.${index}.name`)}
            placeholder="Item name"
            error={!!errors.items?.[index]?.name}
          />
        </div>
        <div className="col-span-2">
          <Input
            {...register(`items.${index}.quantity`, { valueAsNumber: true })}
            type="number"
            error={!!errors.items?.[index]?.quantity}
          />
        </div>
        <div className="col-span-2">
          <Input
            {...register(`items.${index}.price`, { valueAsNumber: true })}
            type="number"
            step="0.01"
            error={!!errors.items?.[index]?.price}
          />
        </div>
        <div className="col-span-2 text-right">
          <span className="text-sm font-bold text-[#888EB0]">
            {(
              (Number(watchedItems?.[index]?.quantity) || 0) *
              (Number(watchedItems?.[index]?.price) || 0)
            ).toFixed(2)}
          </span>
        </div>
        <div className="col-span-1 flex justify-end">
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-[#888EB0] hover:text-[#EC5757] transition-colors"
          >
            🗑
          </button>
        </div>
      </div>
    ))}

    {/* add item */}
    <button
      type="button"
      onClick={() => append({ name: "", quantity: 1, price: 0, total: 0 })}
      className="w-full py-4 rounded-full text-sm font-bold
        text-[#7E88C3] dark:text-[#DFE3FA]
        bg-[#F9FAFE] dark:bg-[#252945]
        hover:bg-[#DFE3FA] dark:hover:bg-[#0C0E16] transition-colors"
    >
      + Add New Item
    </button>
  </section>
);

export default ItemList;
