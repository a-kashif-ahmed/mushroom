import { useEffect, useMemo, useState } from "react";
import AddRowModal from "../components/AddRow";


function PurchasesRoom() {
  const [purchases,setPurchases] = useState([]);
  const [totalGrossWeight, setTotalGrossWeight] = useState(0);
  const [bags, setBags] = useState(0);
  const [modalRows, setModalRows] = useState([]);
  const [totalNetWeight, setTotalNetWeight] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [showAddrow, setShowAddRow] = useState(false);
  const [userChanged,setUserChanged] = useState(false);

  const purchasesRow = {
    date: "",       // or "" if empty
    item: "",
    quantityKg: 0,            // avoid spaces in keys; you can map display names later
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
  ];
useEffect(()=>{
  setPurchases(purchaseData);
},[])


    const handleReturnRows = (rowsMod) => {
    setPurchases((prev) => {
      const updated = [...prev];

      rowsMod.forEach((newRow) => {
        
          // ➕ ADD new row
          updated.push(newRow);
        

      });

      return updated;
    });
    setUserChanged(true);
  };
  const handleChange = (item) => {

    setModalRows([{ ...item }]);
    setShowAddRow(true);
  }

  const totals = useMemo(() => {
    return purchaseData.reduce(
      (acc, row) => {
        acc.quantity += row.quantityKg;
        acc.totalCost += row.totalCost;
        return acc;
      },
      { quantity: 0, totalCost: 0 }
    );
  }, [purchaseData]);

  return (
    <div className="p-6 space-y-6">
      <div className="justify-end top-6 right-6 z-50">
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-full shadow-lg transition transform hover:scale-105" onClick={() => setShowAddRow(!showAddrow)}>
          + Add Row
        </button>
      </div>
      {showAddrow && <AddRowModal emptyRow={purchasesRow} returnRows={handleReturnRows}  onClose={() => { setShowAddRow(false); }} />}

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl shadow-md border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Purchases Overview
          </h2>
          <p className="text-sm text-gray-500">
            Material-wise purchase and expense details
          </p>
        </div>

        <div className="relative overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
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
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-center font-medium whitespace-nowrap"
                  >
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
                  <td className="px-4 py-3 text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.date}
                  </td>
                  <td className="px-4 py-3 text-center font-medium">
                    {row.item}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.quantityKg.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    ₹{row.rate}
                  </td>
                  <td className="px-4 py-3 text-center">
                    ₹{row.cost.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    ₹{row.transportCharge.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    ₹{row.labourCharge.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-red-700">
                    ₹{row.totalCost.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600">
                    {row.remarks || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUMMARY BAR */}
      <div className="bg-slate-900 text-white rounded-xl shadow-md p-6 grid md:grid-cols-2 gap-6">
        {/* <div>
          <h3 className="text-sm uppercase tracking-wide text-slate-300">
            Total Quantity
          </h3>
          <p className="text-lg font-semibold">
            {totals.quantity.toLocaleString()} KG
          </p>
        </div> */}

        <div>
          <h3 className="text-sm uppercase tracking-wide text-slate-300">
            Total Purchase Cost
          </h3>
          <p className="text-lg font-semibold">
            ₹{totals.totalCost.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PurchasesRoom;
