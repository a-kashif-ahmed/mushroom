import { useMemo, useState } from "react";
import AddRowModal from "../components/AddRow";

function SalesRoom() {
  const [sales, setSales] = useState([]);
  const [totalGrossWeight, setTotalGrossWeight] = useState(0);
  const [bags, setBags] = useState(0);
  const [totalNetWeight, setTotalNetWeight] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [showAddrow, setShowAddRow] = useState(false);

  const salesRow = {
    date: new Date(),
    stage: "",
    grossKg: "",
    wastage: "",
    netKg: "",
    amount: ""
  };

  const salesData = [
    {
      date: "21-11-2025",
      flushStage: "1st",
      grossWeight: 36,
      wastage: "NA",
      netWeight: 36,
      amount: 5820,
    },
    {
      date: "22-11-2025",
      flushStage: "1st",
      grossWeight: 405,
      wastage: "NA",
      netWeight: 405,
      amount: 61800,
    },
    {
      date: "23-11-2025",
      flushStage: "2nd",
      grossWeight: 250,
      wastage: "10",
      netWeight: 240,
      amount: 28800,
    },
  ];

  const totals = useMemo(() => {
    return salesData.reduce(
      (acc, row) => {
        if (row.flushStage === "1st") {
          acc.fWeight += row.netWeight;
          acc.fSales += row.amount;
        }
        if (row.flushStage === "2nd") {
          acc.sWeight += row.netWeight;
          acc.sSales += row.amount;
        }
        if (row.flushStage === "3rd") {
          acc.tWeight += row.netWeight;
          acc.tSales += row.amount;
        }
        return acc;
      },
      { fWeight: 0, sWeight: 0, tWeight: 0, fSales: 0, sSales: 0, tSales: 0 }
    );
  }, [salesData]);

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6 h-full overflow-auto">
      {/* ADD ROW BUTTON */}
      <div className="flex justify-start top-0 z-40 bg-gray-50 pb-2">
        <button 
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 sm:px-5 sm:py-3 rounded-full shadow-lg transition transform hover:scale-105 text-sm sm:text-base"
          onClick={() => setShowAddRow(!showAddrow)}
        >
          + Add Row
        </button>
      </div>

      {showAddrow && (
        <AddRowModal 
          emptyRow={salesRow} 
          onClose={() => setShowAddRow(false)} 
        />
      )}

      {/* TABLE CARD */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-md border overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            Sales Room Summary
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Daily flush-wise sales record
          </p>
        </div>

        {/* Scrollable Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[700px]">
            <thead className="bg-slate-800 text-white sticky top-0">
              <tr>
                {[
                  "S.No",
                  "Date",
                  "Flush Stage",
                  "Gross (KG)",
                  "Wastage",
                  "Net (KG)",
                  "Amount (₹)",
                ].map((head, idx) => (
                  <th key={idx} className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center font-medium whitespace-nowrap">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {salesData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b even:bg-gray-50 hover:bg-slate-100 transition"
                >
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
                    {index + 1}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center font-medium">
                    {row.flushStage}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
                    {row.grossWeight}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
                    {row.wastage}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center font-semibold">
                    {row.netWeight}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center font-semibold text-green-700">
                    ₹{row.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUMMARY BAR */}
      <div className="bg-slate-900 text-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Total Weight Section */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs sm:text-sm uppercase tracking-wide text-slate-300 mb-2">
              Total Weight (KG)
            </h3>
            <p className="text-sm sm:text-base">
              First Flush: <span className="font-semibold">{totals.fWeight}</span>
            </p>
            <p className="text-sm sm:text-base">
              Second Flush: <span className="font-semibold">{totals.sWeight}</span>
            </p>
            <p className="text-sm sm:text-base">
              Third Flush: <span className="font-semibold">{totals.tWeight}</span>
            </p>
          </div>

          {/* Total Sales Section */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs sm:text-sm uppercase tracking-wide text-slate-300 mb-2">
              Total Sales (₹)
            </h3>
            <p className="text-sm sm:text-base">
              First Flush:{" "}
              <span className="font-semibold">
                ₹{totals.fSales.toLocaleString()}
              </span>
            </p>
            <p className="text-sm sm:text-base">
              Second Flush:{" "}
              <span className="font-semibold">
                ₹{totals.sSales.toLocaleString()}
              </span>
            </p>
            <p className="text-sm sm:text-base">
              Third Flush:{" "}
              <span className="font-semibold">
                ₹{totals.tSales.toLocaleString()}
              </span>
            </p>
          </div>

          {/* Additional Metrics 1 */}
          <div className="space-y-2 sm:space-y-3">
            <p className="text-sm sm:text-base">
              Gross Weight (KG): <span className="font-semibold">{totalGrossWeight}</span>
            </p>
            <p className="text-sm sm:text-base">
              Total Net Weight (KG): <span className="font-semibold">{totalNetWeight}</span>
            </p>
          </div>

          {/* Additional Metrics 2 */}
          <div className="space-y-2 sm:space-y-3">
            <p className="text-sm sm:text-base">
              Total No. of Bags: <span className="font-semibold">{bags}</span>
            </p>
            <p className="text-sm sm:text-base">
              Total Sales: <span className="font-semibold">₹{totalSales}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
 export default SalesRoom;