type Props = {
  invoiceId: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteModal = ({ invoiceId, onConfirm, onCancel }: Props) => {
  return (
    // backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* modal box */}
      <div
        className="bg-white dark:bg-[#1E2139] rounded-xl px-8 py-10
        shadow-xl w-[90%] max-w-[480px] flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Confirm Deletion
        </h2>

        <p className="text-sm text-[#888EB0] leading-relaxed">
          Are you sure you want to delete invoice{" "}
          <span className="font-bold text-slate-800 dark:text-white">
            #{invoiceId}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-full text-sm font-bold
              text-[#7E88C3] dark:text-[#DFE3FA]
              bg-[#F9FAFE] dark:bg-[#252945]
              hover:bg-[#DFE3FA] transition-colors hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 rounded-full text-sm font-bold
              text-white bg-[#EC5757] hover:bg-[#FF9797]
              transition-colors hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
