import { useEffect, useMemo, useState } from "react";
import Navbar from '../components/Navbar'
import TopBar from '../components/TopBar'
import AddRowModal from '../components/AddRow'
function PurchasesRoom() {
  const [purchases, setPurchases] = useState([]);
  const [showAddrow, setShowAddRow] = useState(false);
  const [userChanged, setUserChanged] = useState(false);

  const purchasesRow = {
    date: "",
    item: "",
    quantityKg: 0,
    rate: 0,
    cost: 0,
    transportCharge: 0,
    labourCharge: 0,
    totalCost: 0,
    remarks: "",
  };

  const purchaseData = [
    {
      date: "22-11-2025",
      item: "Wheat Straw (Bhusha)",
      quantityKg: 10000,
      rate: 7,
      cost: 70000,
      transportCharge: 2950,
      labourCharge: 2950,
      totalCost: 75900,
      remarks: "Bulk purchase",
    },
    {
      date: "23-11-2025",
      item: "Rice Husk",
      quantityKg: 5000,
      rate: 5,
      cost: 25000,
      transportCharge: 1500,
      labourCharge: 1500,
      totalCost: 28000,
      remarks: "Regular order",
    },
  ];

  useEffect(() => {
    setPurchases(purchaseData);
  }, []);

  const handleReturnRows = (rowsMod) => {
    setPurchases((prev) => {
      const updated = [...prev];
      rowsMod.forEach((newRow) => {
        updated.push(newRow);
      });
      return updated;
    });
    setUserChanged(true);
  };

  const handleChange = (item) => {
    setShowAddRow(true);
  };

  const totals = useMemo(() => {
    return purchases.reduce(
      (acc, row) => {
        acc.quantity += row.quantityKg;
        acc.totalCost += row.totalCost;
        return acc;
      },
      { quantity: 0, totalCost: 0 }
    );
  }, [purchases]);

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6 h-full overflow-auto">
      {/* Add Row Button - Sticky on mobile */}
      <div className="flex justify-start  top-0 z-40 bg-gray-50 pb-2">
        <button 
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 sm:px-5 sm:py-3 rounded-full shadow-lg transition transform hover:scale-105 text-sm sm:text-base"
          onClick={() => setShowAddRow(!showAddrow)}
        >
          + Add Row
        </button>
      </div>

      {showAddrow && (
        <AddRowModal
          emptyRow={purchasesRow}
          returnRows={handleReturnRows}
          onClose={() => setShowAddRow(false)}
        />
      )}

      {/* TABLE CARD */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-md border overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            Purchases Overview
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Material-wise purchase and expense details
          </p>
        </div>

        {/* Scrollable Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[800px]">
            <thead className="bg-slate-800 text-white sticky top-0">
              <tr>
                {[
                  "S.No",
                  "Date",
                  "Material",
                  "Quantity (KG)",
                  "Rate (₹)",
                  "Base Cost (₹)",
                  "Transport (₹)",
                  "Labour (₹)",
                  "Total Cost (₹)",
                  "Remarks",
                ].map((head, idx) => (
                  <th key={idx} className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center font-medium whitespace-nowrap">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {purchases.map((row, index) => (
                <tr
                  key={index}
                  className="border-b even:bg-gray-50 hover:bg-slate-100 transition"
                  onDoubleClick={() => handleChange(row)}
                >
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
                    {index + 1}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center font-medium">
                    {row.item}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
                    {row.quantityKg.toLocaleString()}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
                    ₹{row.rate}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
                    ₹{row.cost.toLocaleString()}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
                    ₹{row.transportCharge.toLocaleString()}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
                    ₹{row.labourCharge.toLocaleString()}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center font-semibold text-red-700">
                    ₹{row.totalCost.toLocaleString()}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-gray-600">
                    {row.remarks || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUMMARY BAR */}
      <div className="bg-slate-900 text-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xs sm:text-sm uppercase tracking-wide text-slate-300">
              Total Quantity
            </h3>
            <p className="text-lg sm:text-xl font-semibold mt-1">
              {totals.quantity.toLocaleString()} KG
            </p>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm uppercase tracking-wide text-slate-300">
              Total Purchase Cost
            </h3>
            <p className="text-lg sm:text-xl font-semibold mt-1">
              ₹{totals.totalCost.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasesRoom;