import React from "react";
import {
  TrendingUp,
  AlertTriangle,
  Zap,
  Target,
  ArrowUpRight,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Dummy data from your audit
const DATA = {
  kpis: {
    total_gmv: 418804.51,
    network_str: 0.253,
    avg_lift: 0.056,
    total_volume: 90097,
    yield_gap: 34746.49,
  },
  sellers: [
    { id: "0", vol: 19000, str: 0.268, rev: 115033, q: "Healthy" },
    { id: "7", vol: 20976, str: 0.265, rev: 90586, q: "Healthy" },
    { id: "32", vol: 15371, str: 0.245, rev: 70764, q: "At Risk" },
    { id: "183", vol: 9903, str: 0.304, rev: 46267, q: "Star" },
    { id: "30", vol: 9482, str: 0.236, rev: 31417, q: "At Risk" },
    { id: "8", vol: 8580, str: 0.171, rev: 31041, q: "Factory" },
  ],
  categories: [
    { name: "Power Tools", str: 100, vol: 2 },
    { name: "Specialized Apparel", str: 98, vol: 15 },
    { name: "Electronics", str: 28, vol: 12400 },
    { name: "Home Decor", str: 22, vol: 8900 },
    { name: "Accessories", str: 19, vol: 5600 },
  ],
};

const Reports = () => {
  const chartData = DATA.sellers.map((s) => ({
    x: s.vol,
    y: s.str * 100,
    z: s.rev,
    id: s.id,
    q: s.q,
  }));

  const getBadgeColor = (q) => {
    if (q === "Star")
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (q === "Healthy") return "bg-blue-100 text-blue-700 border-blue-200";
    if (q === "At Risk") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-rose-100 text-rose-700 border-rose-200";
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Strategic Reports
          </h1>
          <p className="text-slate-500 mt-1 uppercase text-xs font-semibold tracking-widest italic">
            Monetization & Inventory Analysis
          </p>
        </div>
        <div className="flex gap-3 text-sm">
          <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>{" "}
            Real-time Stream
          </span>
          <span className="flex items-center gap-1 bg-slate-800 text-white px-3 py-1.5 rounded-full shadow-lg cursor-pointer hover:bg-slate-700 transition">
            Export Report <ChevronRight size={16} />
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total GMV",
            value: `$${(DATA.kpis.total_gmv / 1000).toFixed(1)}K`,
            icon: <BarChart3 className="text-indigo-600" />,
            trend: "+12.4%",
          },
          {
            label: "Network STR",
            value: `${(DATA.kpis.network_str * 100).toFixed(1)}%`,
            icon: <Zap className="text-amber-500" />,
            trend: "-2.1%",
          },
          {
            label: "Average Lift",
            value: `${(DATA.kpis.avg_lift * 100).toFixed(1)}%`,
            icon: <TrendingUp className="text-emerald-500" />,
            trend: "+0.4%",
          },
          {
            label: "Yield Leakage",
            value: `$${(DATA.kpis.yield_gap / 1000).toFixed(1)}K`,
            icon: <AlertTriangle className="text-rose-500" />,
            trend: "Critical",
            color: "text-rose-600",
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition duration-300">
                {kpi.icon}
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-lg ${kpi.color || "text-emerald-600 bg-emerald-50"}`}
              >
                {kpi.trend}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{kpi.label}</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">
              {kpi.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Scatter Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Target className="text-indigo-600" size={20} /> Efficiency Matrix
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Volume"
                  label={{
                    value: "Inventory Volume",
                    position: "bottom",
                    offset: -5,
                    fontSize: 12,
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="STR"
                  unit="%"
                  label={{
                    value: "G-STR (%)",
                    angle: -90,
                    position: "left",
                    fontSize: 12,
                  }}
                />
                <ZAxis type="number" dataKey="z" range={[100, 1000]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={chartData}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.y > 28
                          ? "#10b981"
                          : entry.y < 20
                            ? "#f43f5e"
                            : "#6366f1"
                      }
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <ArrowUpRight className="text-indigo-600" size={20} /> Category
            Velocity
          </h3>
          <div className="space-y-6">
            {DATA.categories.map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-slate-700">
                    {cat.name}
                  </span>
                  <span className="text-slate-500">{cat.str}% Velocity</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                    style={{ width: `${cat.str}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seller Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="text-xs text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <th className="px-6 py-4 font-semibold">Seller ID</th>
              <th className="px-6 py-4 font-semibold text-right">Volume</th>
              <th className="px-6 py-4 font-semibold text-right">G-STR</th>
              <th className="px-6 py-4 font-semibold text-right">Revenue</th>
              <th className="px-6 py-4 font-semibold text-center">Quadrant</th>
            </tr>
          </thead>
          <tbody>
            {DATA.sellers.map((s, i) => (
              <tr
                key={i}
                className="border-b border-slate-50 hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-bold text-slate-700"># {s.id}</td>
                <td className="px-6 py-4 text-right tabular-nums">
                  {s.vol.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right tabular-nums">
                  {(s.str * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right font-bold tabular-nums text-indigo-600">
                  ${s.rev.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tight ${getBadgeColor(s.q)}`}
                  >
                    {s.q}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
