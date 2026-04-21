import { useEffect } from "react";
import useThemeStore from "./store/themeStore";
import { Sidebar } from "./components/common/navbar/sideNav";
import InvoiceList from "./components/common/body/invoice";
import Nav from "./components/common/navbar/nav";

function App() {
  const { dark, toggleDark } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-[#F8F8FB] dark:bg-[#141625]">
      <Sidebar dark={dark} onToggleDark={toggleDark} />
      <main className="pt-16 lg:ml-[80px] ">
        <Nav />
        <InvoiceList />
      </main>
    </div>
  );
}

export default App;
