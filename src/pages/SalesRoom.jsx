import { useMemo, useState } from "react";
import AddRowModal from "../components/AddRow";

function SalesRoom() {
  const [sales,setSales] = useState([]);
  const [totalGrossWeight, setTotalGrossWeight] = useState(0);
  const [bags, setBags] = useState(0);
  const [totalNetWeight, setTotalNetWeight] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [showAddrow, setShowAddRow] = useState(false);
  const salesRow= {
  date: new Date(),       // or "" if empty
  stage: "",
  grossKg: "",            // avoid spaces in keys; you can map display names later
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
    <div className="p-6 space-y-6 relative">
      {/* ADD ROW BUTTON */}
      <div className="justify-end top-6 right-6 z-50">
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-full shadow-lg transition transform hover:scale-105" onClick={() => setShowAddRow(!showAddrow)}>
          + Add Row
        </button>
      </div>
      {showAddrow && <AddRowModal emptyRow={salesRow} onClose={() => { setShowAddRow(false); }} />}
      {/* TABLE CARD */}
      <div className="bg-white rounded-xl shadow-md border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Sales Room Summary
          </h2>
          <p className="text-sm text-gray-500">Daily flush-wise sales record</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
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
                ].map((head) => (
                  <th key={head} className="px-4 py-3 text-center font-medium">
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
                  <td className="px-4 py-3 text-center">{index + 1}</td>
                  <td className="px-4 py-3 text-center">{row.date}</td>
                  <td className="px-4 py-3 text-center font-medium">
                    {row.flushStage}
                  </td>
                  <td className="px-4 py-3 text-center">{row.grossWeight}</td>
                  <td className="px-4 py-3 text-center">{row.wastage}</td>
                  <td className="px-4 py-3 text-center font-semibold">
                    {row.netWeight}
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-green-700">
                    ₹{row.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUMMARY BAR */}
      <div className="bg-slate-900 text-white rounded-xl shadow-md p-6 grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-sm uppercase tracking-wide text-slate-300">
            Total Weight (KG)
          </h3>
          <p>
            First Flush: <span className="font-semibold">{totals.fWeight}</span>
          </p>
          <p>
            Second Flush: <span className="font-semibold">{totals.sWeight}</span>
          </p>
          <p>
            Third Flush: <span className="font-semibold">{totals.tWeight}</span>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm uppercase tracking-wide text-slate-300">
            Total Sales (₹)
          </h3>
          <p>
            First Flush:{" "}
            <span className="font-semibold">
              ₹{totals.fSales.toLocaleString()}
            </span>
          </p>
          <p>
            Second Flush:{" "}
            <span className="font-semibold">
              ₹{totals.sSales.toLocaleString()}
            </span>
          </p>
          <p>
            Third Flush:{" "}
            <span className="font-semibold">
              ₹{totals.tSales.toLocaleString()}
            </span>
          </p>
        </div>

        <div className="space-y-3">
          <p>
            Gross Weight (KG): <span className="font-semibold">{totalGrossWeight}</span>
          </p>
          <p>
            Total Net Weight (KG): <span className="font-semibold">{totalNetWeight}</span>
          </p>
        </div>

        <div className="space-y-3">
          <p>
            Total No. of Bags: <span className="font-semibold">{bags}</span>
          </p>
          <p>
            Total Sales: <span className="font-semibold">₹{totalSales}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SalesRoom;
