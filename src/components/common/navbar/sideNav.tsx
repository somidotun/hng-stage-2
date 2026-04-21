import logo from "../../../assets/icons/icon.svg";
import moon from "../../../assets/icons/moon.svg";
import sun from "../../../assets/icons/sun.svg";
import avater from "../../../assets/images/Oval.svg";

type SidebarProps = {
  dark: boolean;
  onToggleDark: () => void;
};

export const Sidebar = ({ dark, onToggleDark }: SidebarProps) => (
  <nav
    className="fixed  top-0 h-16 w-full bg-[#373B53] dark:bg-[#1E2139]
      flex flex-row items-center z-20  overflow-hidden justify-between
      lg:left-0 lg:h-full lg:w-[80px] lg:flex-col lg:rounded-r-3xl
      "
  >
    {/* Logo */}
    <div
      className="w-1/6 md:w-1/12 lg:w-full h-24 relative overflow-hidden flex items-center justify-center
     lg:1/2"
    >
      {/* Colored background (smaller height) */}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full h-12 bg-[#7C5DFA]"></div>
        <div className="w-full   h-12 bg-[#9277FF]"></div>
      </div>

      {/* Logo image */}
      <img src={logo} alt="logo" className="absolute w-8 h-8" />
    </div>

    <div className="w-5/6 md:w-11/12 justify-end  lg:1/2 ">
      {/* Dark mode toggle */}
      <div className="flex flex-row justify-end lg:flex-col items-center ">
        <button
          onClick={onToggleDark}
          className="mb-4 w-10 h-10 flex items-center justify-center rounded-full
        hover:bg-slate-700 transition-colors text-slate-400 hover:text-white hover:cursor-pointer"
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <img src={dark ? sun : moon} alt={dark ? "sun" : "moon"} />
        </button>

        {/* User avatar */}
        <div className="w-20 lg:w-full border-t border-slate-700 py-4 flex items-center justify-center">
          <div className="w-9 h-9 rounded-full bg-violet-400 flex items-center justify-center text-white font-bold text-sm">
            <img src={avater} alt="avater" className="absolute w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  </nav>
);
