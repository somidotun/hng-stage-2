import InvoiceList from "../components/common/body/invoice";
import Nav from "../components/common/navbar/nav";

const Home = () => {
  return (
    <div>
      <main className="pt-16 lg:ml-[80px] ">
        <Nav />
        <InvoiceList />
      </main>
    </div>
  );
};

export default Home;
