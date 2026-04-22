const Field = ({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <div className="flex justify-between">
      <label className="text-xs text-[#7E88C3] dark:text-[#DFE3FA]">
        {label}
      </label>
      {error && <span className="text-xs text-[#EC5757]">{error}</span>}
    </div>
    {children}
  </div>
);

export default Field;
