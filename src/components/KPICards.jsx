import React from "react";
import { FaGavel, FaDollarSign, FaChartLine, FaChartBar } from "react-icons/fa";

const KPICards = ({ stats, data }) => {
  if (!stats) return null;

  // stats comes from API:
  // stats = { total_count, avg_price, total_bid_count, avg_bid_number }

  const totalAuctions = (stats.total_count || 0).toLocaleString(); // 1,234
  const totalBids = (stats.total_bid_count || 0).toLocaleString(); // 5,678
  const avgPrice = (stats.avg_price ? stats.avg_price : 0).toLocaleString(
    undefined,
    { minimumFractionDigits: 1, maximumFractionDigits: 1 },
  ); // 123.4
  const avgBids = (
    stats.avg_bid_number ? stats.avg_bid_number : 0
  ).toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }); // 5.6

  const statsArray = [
    {
      label: "Total Auctions",
      value: totalAuctions,
      icon: <FaGavel />,
      color: "blue",
    },
    {
      label: "Avg. Price",
      value: `$${avgPrice}`,
      icon: <FaDollarSign />,
      color: "emerald",
    },
    {
      label: "Total Bids",
      value: totalBids,
      icon: <FaChartLine />,
      color: "amber",
    },
    {
      label: "Avg. Bids",
      value: avgBids,
      icon: <FaChartBar />,
      color: "rose",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsArray.map((s, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-2 rounded-xl text-${s.color}-600 bg-${s.color}-50`}
            >
              {s.icon}
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500">{s.label}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{s.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
