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

const Reports = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    fetch(
      "https://erp.thriftops.com/techWork/api/get_shopgoodwill_reporting_data.php",
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">API Error</div>;
  if (!data) return null;

  const chartData = data.sellers.map((s) => ({
    x: s.vol,
    y: s.str,
    z: s.rev,
    id: s.id,
    q: s.q,
  }));
  const formatNumber = (num, options = {}) =>
    num?.toLocaleString(undefined, options);

  const getBadgeColor = (q) => {
    if (q === "Star")
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (q === "Healthy") return "bg-blue-100 text-blue-700 border-blue-200";
    if (q === "At Risk") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-rose-100 text-rose-700 border-rose-200";
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      {/* HEADER */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Strategic Reports
          </h1>
          <p className="text-slate-500 mt-1 text-xs uppercase">
            Monetization & Inventory Analysis
          </p>
        </div>

        <div className="flex gap-3 text-sm items-center">
          {/* DATE */}
          <span className="bg-white px-3 py-1.5 rounded-full border text-slate-600">
            {today}
          </span>

          <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            Live Data
          </span>

          <span
            className="flex items-center gap-1 bg-slate-800 text-white px-3 py-1.5 rounded-full cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Export <ChevronRight size={16} />
          </span>
        </div>
      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total GMV",
            value: `$${formatNumber((data?.kpis?.total_gmv || 0) / 1000, {
              maximumFractionDigits: 1,
            })}K`,
            icon: <BarChart3 className="text-indigo-600" />,
          },
          {
            label: "Total Volume",
            value: formatNumber(data?.kpis?.total_volume || 0),
            icon: <Zap className="text-amber-500" />,
          },
          {
            label: "Avg Price",
            value: `$${formatNumber(data?.kpis?.avg_price || 0, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
            icon: <TrendingUp className="text-emerald-500" />,
          },
          {
            label: "Total Bids",
            value: formatNumber(data?.kpis?.total_bids || 0),
            icon: <AlertTriangle className="text-rose-500" />,
          },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border shadow-sm">
            <div className="flex justify-between mb-3">{kpi.icon}</div>
            <p className="text-slate-500 text-sm">{kpi.label}</p>
            <h3 className="text-2xl font-bold">{kpi.value}</h3>
          </div>
        ))}
      </div>

      {/* SCATTER CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border shadow-sm">
          <h3 className="font-bold flex items-center gap-2 mb-4">
            <Target className="text-indigo-600" />
            Efficiency Matrix
          </h3>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <XAxis dataKey="x" type="number" name="Volume" />
                <YAxis dataKey="y" type="number" name="STR" />
                <ZAxis dataKey="z" range={[100, 1000]} />
                <Tooltip />

                <Scatter data={chartData}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.y > 50
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

        {/* CATEGORY */}
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <ArrowUpRight className="text-indigo-600" />
            Category Velocity
          </h3>

          <div className="space-y-5">
            {data.categories.map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">{cat.name}</span>
                  <span>{cat.str}%</span>
                </div>

                <div className="h-2 bg-slate-100 rounded-full">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${cat.str}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div
        className="bg-white rounded-3xl border shadow-sm overflow-x-auto"
        style={{ display: "none" }}
      >
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-xs text-slate-400 border-b">
              <th className="p-4">Seller</th>
              <th className="p-4 text-right">Volume</th>
              <th className="p-4 text-right">STR</th>
              <th className="p-4 text-right">Revenue</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.sellers.map((s, i) => (
              <tr key={i} className="border-b hover:bg-slate-50">
                <td className="p-4 font-bold">#{s.id}</td>
                <td className="p-4 text-right">{s.vol}</td>
                <td className="p-4 text-right">{s.str}%</td>
                <td className="p-4 text-right text-indigo-600 font-bold">
                  ${s.rev}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs border ${getBadgeColor(s.q)}`}
                  >
                    {s.q}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-bold mb-4">Export Report</h2>

            <p className="text-sm text-slate-500 mb-3">
              Enter email to receive report
            </p>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded-lg mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!email) return alert("Enter email");

                  // CALL API HERE
                  fetch(
                    "https://erp.thriftops.com/techWork/api/export_report.php",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email }),
                    },
                  );

                  alert("Report sent to email");
                  setShowModal(false);
                  setEmail("");
                }}
                className="px-4 py-2 text-sm bg-slate-800 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
