import empty from "@/../../src/assets/images/empty Email.svg";

// type Props = {};

const EmptyEmail = () => {
  return (
    <div className="flex items-center justify-center lg:w-[30%]">
      <div className="flex flex-col gap-5">
        <img src={empty} alt="empty invoice" className="lg:w-72" />
        <h1 className="text-center  dark:text-white text-2xl font-bold">
          There is nothing here
        </h1>
        <p className="text-center  dark:text-[#DFE3FA]">
          Create a new invoice by clicking the New invoice button and get
          started
        </p>
      </div>
    </div>
  );
};

export default EmptyEmail;
