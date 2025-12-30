
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";


export default function AdminPanel() {
    const [navOpen, setNavOpen] = useState(true);
    const [owners, setOwners] = useState([]);
    const [managers, setManagers] = useState([]);

    const [showOwnerModal, setShowOwnerModal] = useState(false);
    const [showManagerModal, setShowManagerModal] = useState(false);

    const [newOwner, setNewOwner] = useState("");
    const [newManager, setNewManager] = useState("");

    const [form, setForm] = useState({
        companyName: "",
        owner: "",
        manager: "",
        active: true,
    });

    const [companies, setCompanies] = useState([]);

    const addCompany = () => {
        if (!form.companyName || !form.owner || !form.manager) return;

        const startDate = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(startDate.getDate() + 30);

        setCompanies([
            ...companies,
            {
                id: Date.now(),
                ...form,
                startDate,
                expiryDate,
            },
        ]);

        setForm({
            companyName: "",
            owner: "",
            manager: "",
            active: true,
        });
    };

    const daysLeft = (expiry) => {
        const diff = expiry - new Date();
        return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
    };

    return (
        <div className="bg-gray-50">
            <div className="flex min-h-screen bg-gray-50">
                <Navbar open={navOpen} setOpen={setNavOpen} />

                {/* MAIN CONTENT */}
                <div className={`flex-1 transition-all duration-300 ${navOpen ? "ml-56" : "ml-0"}`}>
                    <TopBar />
                    <div className="min-h-screen bg-gray-100 p-6">
                        <div className="max-w-6xl mx-auto space-y-6">

                            {/* HEADER */}
                            <h1 className="text-2xl font-bold">Admin Panel – Company Access</h1>

                            {/* FORM */}
                            <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                                <input
                                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Company Name"
                                    value={form.companyName}
                                    onChange={(e) =>
                                        setForm({ ...form, companyName: e.target.value })
                                    }
                                />

                                {/* OWNER SELECT */}
                                <div className="flex gap-2">
                                    <select
                                        className="border rounded px-3 py-2 w-full"
                                        value={form.owner}
                                        onChange={(e) => setForm({ ...form, owner: e.target.value })}
                                    >
                                        <option value="">Select Owner</option>
                                        {owners.map((o) => (
                                            <option key={o.id} value={o.name}>{o.name}</option>
                                        ))}
                                    </select>

                                    <button
                                        onClick={() => setShowOwnerModal(true)}
                                        className="bg-blue-500 text-white px-3 rounded"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* MANAGER SELECT */}
                                <div className="flex gap-2">
                                    <select
                                        className="border rounded px-3 py-2 w-full"
                                        value={form.manager}
                                        onChange={(e) => setForm({ ...form, manager: e.target.value })}
                                    >
                                        <option value="">Select Manager</option>
                                        {managers.map((m) => (
                                            <option key={m.id} value={m.name}>{m.name}</option>
                                        ))}
                                    </select>

                                    <button
                                        onClick={() => setShowManagerModal(true)}
                                        className="bg-blue-500 text-white px-3 rounded"
                                    >
                                        +
                                    </button>
                                </div>


                                {/* TOGGLE */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() =>
                                            setForm({ ...form, active: !form.active })
                                        }
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${form.active ? "bg-green-500" : "bg-gray-300"
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${form.active ? "translate-x-6" : "translate-x-1"
                                                }`}
                                        />
                                    </button>
                                    <span className="text-sm font-medium">
                                        {form.active ? "Active" : "Inactive"}
                                    </span>
                                </div>

                                <button
                                    onClick={addCompany}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Add Company
                                </button>
                            </div>

                            {/* TABLE */}
                            <div className="bg-white rounded-lg shadow overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Company</th>
                                            <th className="px-4 py-3 text-left">Owner</th>
                                            <th className="px-4 py-3 text-left">Manager</th>
                                            <th className="px-4 py-3 text-left">Status</th>
                                            <th className="px-4 py-3 text-left">Days Left</th>
                                            <th className="px-4 py-3 text-left">Expiry</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {companies.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center py-6 text-gray-500"
                                                >
                                                    No companies added
                                                </td>
                                            </tr>
                                        )}

                                        {companies.map((c) => {
                                            const remaining = daysLeft(c.expiryDate);

                                            return (
                                                <tr
                                                    key={c.id}
                                                    className="border-t hover:bg-gray-50"
                                                >
                                                    <td className="px-4 py-3 font-medium">
                                                        {c.companyName}
                                                    </td>
                                                    <td className="px-4 py-3">{c.owner}</td>
                                                    <td className="px-4 py-3">{c.manager}</td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`px-2 py-1 rounded text-xs font-semibold ${c.active
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-red-100 text-red-700"
                                                                }`}
                                                        >
                                                            {c.active ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 font-semibold">
                                                        <span
                                                            className={
                                                                remaining <= 5
                                                                    ? "text-red-600"
                                                                    : "text-gray-800"
                                                            }
                                                        >
                                                            {remaining} days
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {c.expiryDate.toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {showOwnerModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 space-y-4">
      <h2 className="text-lg font-semibold">Create Owner Profile</h2>

      <input
        className="border rounded px-3 py-2 w-full"
        placeholder="Owner Name"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowOwnerModal(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (!newOwner) return;
            setOwners([...owners, { id: Date.now(), name: newOwner }]);
            setNewOwner("");
            setShowOwnerModal(false);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
{showManagerModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 space-y-4">
      <h2 className="text-lg font-semibold">Create Manager Profile</h2>

      <input
        className="border rounded px-3 py-2 w-full"
        placeholder="Manager Name"
        value={newManager}
        onChange={(e) => setNewManager(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowManagerModal(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (!newManager) return;
            setManagers([...managers, { id: Date.now(), name: newManager }]);
            setNewManager("");
            setShowManagerModal(false);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
    

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
