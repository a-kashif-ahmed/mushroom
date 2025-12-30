import { useState } from "react";

function Navbar({ open, setOpen }) {
  return (
    <>
      {/* VERTICAL TOGGLE BAR */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed top-0 z-50 h-screen w-3
        bg-emerald-600 hover:bg-emerald-800
        flex items-center justify-center
        text-white transition-all duration-300
        ${open ? "left-56" : "left-0"}`}
        aria-label="Toggle Sidebar"
      >
        <span className="text-xl">
          {open ? "❮" : "❯"}
        </span>
      </button>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-56
        bg-emerald-600 text-white shadow-lg
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-emerald-500">
          <h2 className="font-semibold text-lg tracking-wide">
            Mushrooms
          </h2>
        </div>

        {/* Menu */}
        <nav className="mt-4 flex flex-col gap-1 px-2">
          <NavItem label="Home" link="/" />
          <NavItem label="Purchases" link="/purchases" />
          <NavItem label="Sales" link="/sales" />
          <NavItem label="Profile" link="/profile"/>
          <NavItem label="Login" link="/login"/>
          <NavItem label="Admin Panel" link="/admin"/>
        </nav>
      </aside>
    </>
  );
}

function NavItem({ label, link }) {
  return (
    <a
      href={link}
      className="flex items-center gap-3 px-3 py-2 rounded-md
                 hover:bg-emerald-700 transition"
    >
      <span className="text-sm font-medium whitespace-nowrap">
        {label}
      </span>
    </a>
  );
}

export default Navbar;