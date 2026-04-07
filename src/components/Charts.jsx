import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ data, type }) => {
  if (!data || data.length === 0) return null;

  if (type === "avgPriceByCategory") {
    const chartData = [];
    const map = {};
    data.forEach((d) => {
      if (map[d.category_name]) {
        map[d.category_name].sum += d.current_price;
        map[d.category_name].count += 1;
      } else map[d.category_name] = { sum: d.current_price, count: 1 };
    });
    for (const key in map)
      chartData.push({
        category: key,
        avgPrice: (map[key].sum / map[key].count).toFixed(2),
      });

    return (
      <div className="bg-white rounded-xl shadow-lg p-5">
        <h3 className="font-bold text-gray-700 mb-3">
          Average Price by Category
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avgPrice" fill="#1E40AF" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === "bidsVsPrice") {
    return (
      <div className="bg-white rounded-xl shadow-lg p-5">
        <h3 className="font-bold text-gray-700 mb-3">Bids vs Price</h3>
        <ResponsiveContainer width="100%" height={250}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="current_price" name="Price" />
            <YAxis type="number" dataKey="num_bids" name="Bids" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={data} fill="#1E40AF" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === "top10Auctions") {
    const top10 = [...data]
      .sort((a, b) => b.current_price - a.current_price)
      .slice(0, 10);
    return (
      <div className="bg-white rounded-xl shadow-lg p-5">
        <h3 className="font-bold text-gray-700 mb-3">Top 10 Auctions</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={top10}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="current_price" fill="#1E40AF" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
};

export default Charts;
