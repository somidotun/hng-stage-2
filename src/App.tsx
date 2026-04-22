import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import useThemeStore from "./store/themeStore";
import Home from "./pages/home";
import InvoiceDetail from "./components/common/body/InvoiceDetail";
import SideNav from "./components/common/navbar/sideNav";
import EditInvoice from "./components/common/body/editInvoice";

function App() {
  const { dark, toggleDark } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <section className="min-h-screen bg-[#F8F8FB] dark:bg-[#141625]">
      <SideNav dark={dark} onToggleDark={toggleDark} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
        <Route path="/invoice/:id/edit" element={<EditInvoice />} />
      </Routes>
    </section>
  );
}

export default App;
