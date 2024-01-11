import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

function Navbar({ open, setOpen }) {
  return (
    <header className="flex items-center gap-[2em] z-10 px-8 py-5 bg-[#286d26] text-white font-bold text-[2rem] sticky top-0">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {open ? (
          <AiOutlineClose className="hover:opacity-80" />
        ) : (
          <RxHamburgerMenu className="hover:opacity-80" />
        )}
      </div>
      <h1>Archive Demo</h1>
    </header>
  );
}

export default Navbar;
