import { useEffect, useMemo, useState } from "react";
import Navbar from '../components/Navbar'
import TopBar from '../components/TopBar'
import PurchasesRoom from "./PurchaseRoom";

function Purchases() {
  const [navOpen, setNavOpen] = useState(false); // Default closed on mobile
  const [tabs, setTabs] = useState([{ id: 1, title: "Room 1" }]);
  const [activeTab, setActiveTab] = useState(1);

  const addTab = () => {
    const newId = Date.now();
    setTabs([...tabs, { id: newId, title: `Room ${tabs.length + 1}` }]);
    setActiveTab(newId);
  };

  const closeTab = (id) => {
    if (tabs.length === 1) return; // Don't close last tab
    const filtered = tabs.filter((tab) => tab.id !== id);
    setTabs(filtered);

    if (id === activeTab && filtered.length) {
      setActiveTab(filtered[filtered.length - 1].id);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* SIDEBAR */}
      <Navbar open={navOpen} />

      {/* Overlay for mobile */}
      {/* {navOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setNavOpen(false)}
        />
      )} */}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onToggleSidebar={() => setNavOpen((v) => !v)} />

        {/* Tabs - Horizontally scrollable on mobile */}
        <div className="flex items-center bg-gray-200 border-b overflow-x-auto">
          <div className="flex min-w-max">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 cursor-pointer border-r text-sm sm:text-base whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white font-semibold"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {tab.title}
                {tabs.length > 1 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    className="text-gray-500 hover:text-red-500 ml-1"
                  >
                    ✕
                  </span>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addTab}
            className="px-3 sm:px-4 py-2 text-xl hover:bg-gray-300 sticky right-0 bg-gray-200"
          >
            +
          </button>
        </div>

        {/* Room Content */}
        <div className="flex-1 overflow-hidden">
          {tabs.map((tab) =>
            tab.id === activeTab ? <PurchasesRoom key={tab.id} /> : null
          )}
        </div>
      </div>
    </div>
  );
}

export default Purchases;