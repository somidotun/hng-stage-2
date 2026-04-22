import { forwardRef } from "react";

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
};

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ error, children, ...props }, ref) => (
    <select
      ref={ref}
      {...props}
      className={`w-full px-4 py-3 rounded-md border text-sm font-bold
        text-slate-800 dark:text-white bg-white dark:bg-[#1E2139]
        focus:outline-none focus:border-[#7C5DFA] transition-colors
        ${
          error ? "border-[#EC5757]" : "border-[#DFE3FA] dark:border-[#252945]"
        }`}
    >
      {children}
    </select>
  ),
);

export default SelectField;
