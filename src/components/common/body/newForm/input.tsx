const Input = ({
  error,
  placeholder,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) => (
  <input
    {...props}
    placeholder={placeholder}
    className={`w-full px-4 py-3 rounded-md border text-sm font-bold
      text-slate-800 dark:text-white bg-white dark:bg-[#1E2139]
      placeholder:text-[#888EB0] placeholder:font-normal
      focus:outline-none focus:border-[#7C5DFA] transition-colors
      ${error ? "border-[#EC5757]" : "border-[#DFE3FA] dark:border-[#252945]"}`}
  />
);

export default Input;
