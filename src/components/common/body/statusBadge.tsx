type StatusType = "paid" | "pending" | "draft";

const statusStyles: Record<StatusType, { badge: string; dot: string }> = {
  paid: {
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  pending: {
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  draft: {
    badge: "bg-slate-400/10 text-slate-500 dark:text-slate-400",
    dot: "bg-slate-400",
  },
};

const StatusBadge = ({ status }: { status: string }) => {
  const key = status.toLowerCase() as StatusType;
  const style = statusStyles[key] ?? statusStyles.draft;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium ${style.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
