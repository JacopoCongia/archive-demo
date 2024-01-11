import { useEffect, useRef } from "react";

import SignIn from "./SignIn";

function Sidebar({ open, setOpen }) {
  const navRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div
      ref={navRef}
      className={`flex w-full min-[500px]:w-[350px] z-10 bg-[#e4e4e4] min-h-[100vh] fixed top-30 translate-x-[-100%] duration-[0.5s] ${
        open && "translate-x-[0%]"
      }`}
    >
      <SignIn />
    </div>
  );
}

export default Sidebar;
