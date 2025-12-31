import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import Sales from "./Sales";
import QuickAction from "../components/Quick";

function Profile() {
  const [navOpen, setNavOpen] = useState(true);
  // 🔹 Dummy login data
  const user = {
    name: "Amit Kumar",
    email: "amit@example.com",
    role: "Owner",
    loginMethod: "Email & Password",
    lastLogin: "18 Sep 2025, 10:42 AM",
    plan: "Premium",
    expiryDate: "31 Dec 2025",
  };

  return (
    <div className="bg-gray-50 h-screen overflow-hidden">
  <div className="flex justify-center min-h-screen bg-gray-50">

    {/* SIDEBAR */}
    <Navbar open={navOpen} />

    {/* MAIN CONTENT */}
    <div
      className={`flex-1 transition-all duration-300
      ${navOpen ? "md:ml-56 ml-0" : "ml-0"}`}
    >
      <TopBar onToggleSidebar={() => setNavOpen(v => !v)} />
      

      {/* PAGE TITLE */}
      <div className="m-7 ">
        <h1 className="text-2xl font-semibold text-gray-800">
          Profile
        </h1>
        <p className="text-sm text-gray-500">
          Account and login information
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-xl shadow-md border p-6 max-w-3xl">

        {/* HEADER */}
        <div className="flex items-center gap-4 border-b pb-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-emerald-500 text-white
                          flex items-center justify-center text-xl font-semibold">
            {user.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        {/* INFO GRID */}
        <div className="grid sm:grid-cols-2 gap-6">

          <InfoItem label="Role" value={user.role} />

          <InfoItem label="Login Method" value={user.loginMethod} />

          <InfoItem label="Last Login" value={user.lastLogin} />

          <InfoItem
            label="Plan"
            value={user.plan}
            badge
            active
          />

          <InfoItem
            label="Subscription Expiry"
            value={user.expiryDate}
            badge
            active={false}
          />

        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

function InfoItem({ label, value, badge, active = true }) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </p>

      {!badge ? (
        <p className="text-sm font-medium text-gray-800">
          {value}
        </p>
      ) : (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
          ${active
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"}`}
        >
          {value}
        </span>
      )}
    </div>
  );
}

export default Profile;
