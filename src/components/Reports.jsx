import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

/* ── fonts ── */
const FontLink = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
  </>
);

/* ── global styles scoped to .rpt-page ── */
const GlobalStyle = () => (
  <style>{`
    .rpt-page *, .rpt-page *::before, .rpt-page *::after { box-sizing:border-box; }
    .rpt-page {
      --bg:#f5f3ee; --surface:#ffffff; --surface2:#eeece7;
      --border:rgba(0,0,0,0.1); --text:#1a1917; --muted:#6b6963;
      --accent:#2a5cdb; --accent2:#0f9e6e; --accent3:#d4420f; --accent4:#8b3fd8;
      --radius:12px;
      font-family:'Syne',sans-serif;
      background:var(--bg); color:var(--text);
      min-height:100vh; padding:2rem;
    }
    .rpt-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:2rem; padding-bottom:1.5rem; border-bottom:1px solid var(--border); flex-wrap:wrap; gap:12px; }
    .rpt-header h1 { font-size:1.6rem; font-weight:700; letter-spacing:-0.02em; margin:0; }
    .rpt-header p  { font-family:'DM Mono',monospace; font-size:0.75rem; color:var(--muted); margin:4px 0 0; }
    .rpt-header-right { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
    .rpt-badge { font-family:'DM Mono',monospace; font-size:0.7rem; background:var(--surface2); border:1px solid var(--border); border-radius:999px; padding:6px 14px; color:var(--muted); }
    .rpt-badge-live   { background:#f0fdf4; color:#0f9e6e; border:1px solid #0f9e6e30; }
    .rpt-badge-export { background:#1a1917; color:#fff; cursor:pointer; }

    .rpt-metric-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:1.5rem; }
    @media(max-width:900px){ .rpt-metric-grid { grid-template-columns:repeat(2,1fr); } }
    @media(max-width:520px){ .rpt-metric-grid { grid-template-columns:1fr; } }

    .rpt-metric { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:18px 20px; position:relative; overflow:hidden; }
    .rpt-metric::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; }
    .rpt-m-blue::before   { background:var(--accent); }
    .rpt-m-green::before  { background:var(--accent2); }
    .rpt-m-orange::before { background:var(--accent3); }
    .rpt-m-purple::before { background:var(--accent4); }
    .rpt-metric-label { font-family:'DM Mono',monospace; font-size:0.68rem; text-transform:uppercase; color:var(--muted); margin-bottom:8px; }
    .rpt-metric-value { font-size:2rem; font-weight:700; line-height:1; transition:all 0.2s; }
    .rpt-metric-sub   { font-family:'DM Mono',monospace; font-size:0.68rem; color:var(--muted); margin-top:6px; }

    .rpt-chart-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
    @media(max-width:768px){ .rpt-chart-grid { grid-template-columns:1fr; } }

    .rpt-chart-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:20px; }
    .rpt-card-title { font-family:'DM Mono',monospace; font-size:0.68rem; text-transform:uppercase; color:var(--muted); margin-bottom:4px; }
    .rpt-card-desc  { font-size:0.85rem; color:var(--muted); margin-bottom:16px; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }

    .rpt-active-filter {
      display:inline-flex; align-items:center; gap:6px;
      font-family:'DM Mono',monospace; font-size:0.68rem;
      background:#2a5cdb; color:#fff; border-radius:999px;
      padding:3px 10px; cursor:pointer; border:none;
      transition:background 0.2s;
    }
    .rpt-active-filter:hover { background:#1e45a8; }

    .rpt-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; z-index:50; }
    .rpt-modal   { background:#fff; width:400px; max-width:90vw; padding:24px; border-radius:16px; box-shadow:0 20px 60px rgba(0,0,0,0.15); }
    .rpt-modal h2 { font-size:18px; font-weight:700; margin:0 0 8px; font-family:'Syne',sans-serif; }
    .rpt-modal p  { font-family:'DM Mono',monospace; font-size:12px; color:#6b6963; margin:0 0 14px; }
    .rpt-modal input { width:100%; border:1px solid rgba(0,0,0,0.15); padding:10px 12px; border-radius:8px; margin-bottom:14px; font-family:'DM Mono',monospace; font-size:13px; outline:none; box-sizing:border-box; }
    .rpt-modal-btns { display:flex; justify-content:flex-end; gap:8px; }
    .rpt-modal-cancel { padding:8px 16px; font-size:13px; border:1px solid rgba(0,0,0,0.15); border-radius:8px; background:none; cursor:pointer; font-family:'Syne',sans-serif; }
    .rpt-modal-send   { padding:8px 16px; font-size:13px; background:#1a1917; color:#fff; border:none; border-radius:8px; cursor:pointer; font-family:'Syne',sans-serif; }

    @keyframes rpt-spin { to { transform:rotate(360deg); } }
    .rpt-spinner { width:36px; height:36px; border:3px solid #2a5cdb; border-top-color:transparent; border-radius:50%; animation:rpt-spin 0.8s linear infinite; margin:0 auto 12px; }
  `}</style>
);

/* ── tooltip ── */
const ChartTooltip = ({ active, payload, label, suffix = "" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 8,
        padding: "8px 12px",
        fontFamily: "'DM Mono',monospace",
        fontSize: 11,
      }}
    >
      <p style={{ color: "#6b6963", marginBottom: 2 }}>{label}</p>
      <p style={{ fontWeight: 700, color: "#1a1917" }}>
        {Number(payload[0].value).toLocaleString()}
        {suffix}
      </p>
    </div>
  );
};

const C_SALES = "#2a5cdb";
const C_ST = "#0f9e6e";
const C_TYPE = ["#2a5cdb", "#0f9e6e", "#c97b10"];
const C_PRICE = "#8b3fd8";
const C_DIM_S = "rgba(42,92,219,0.2)";
const C_DIM_ST = "rgba(15,158,110,0.2)";

/* ═══════════════════════════════════════════════════════════════════════════ */
const Reports = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [activeCat, setActiveCat] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  React.useEffect(() => {
    fetch("https://erp.thriftops.com/techWork/api/get_shopgood_lw.php")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  const handleSend = async () => {
    if (!email) return alert("Enter email");
    await fetch("https://erp.thriftops.com/techWork/api/export_report.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    alert("Report sent to email");
    setShowModal(false);
    setEmail("");
  };

  /* ── loading / error ── */
  if (loading)
    return (
      <>
        <FontLink />
        <GlobalStyle />
        <div
          className="rpt-page"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontFamily: "'DM Mono',monospace",
              color: "#6b6963",
            }}
          >
            <div className="rpt-spinner" />
            Loading...
          </div>
        </div>
      </>
    );
  if (error)
    return (
      <>
        <FontLink />
        <GlobalStyle />
        <div
          className="rpt-page"
          style={{ color: "#d4420f", fontFamily: "'DM Mono',monospace" }}
        >
          API Error: {error.message}
        </div>
      </>
    );
  if (!data) return null;

  /* ── data ── */
  const kpis = data.kpis ?? {};
  const allCats = data.categories ?? [];
  const allTypes = data.listing_types ?? [];
  const allPriceDist = data.price_distribution ?? [];
  const dateFrom = data.date_from ?? "";
  const dateTo = data.date_to ?? "";

  /* selected category object */
  const catObj = activeCat
    ? (allCats.find((c) => c.name === activeCat) ?? null)
    : null;

  /* ── metric values — toggle on category click ── */
  const fmt2 = (n) =>
    Number(n ?? 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const mTotal = catObj
    ? Number(catObj.vol).toLocaleString()
    : Number(kpis.total_volume ?? 0).toLocaleString();
  const mPrice = catObj
    ? `$${fmt2(catObj.avg_price)}`
    : `$${fmt2(kpis.avg_price)}`;
  const mStr = catObj ? `${catObj.str}%` : `${kpis.sell_through ?? 0}%`;
  const mAuction = catObj
    ? `${catObj.sold}`
    : Number(kpis.total_bids ?? 0).toLocaleString();

  /* sub-labels */
  const dateSub =
    dateFrom && dateTo ? `${dateFrom} – ${dateTo}` : "Full Data Set";
  const mTotalSub = catObj ? `In ${activeCat}` : dateSub;
  const mPriceSub = catObj ? `In ${activeCat}` : "Market Weighted";
  const mStrSub = catObj ? `In ${activeCat}` : "Velocity Index";
  const mAuctionSub = catObj ? `In ${activeCat}` : "Conversion Rate";

  /* ── donut — per category or overall ── */
  const typeChartData = catObj?.type_pct
    ? [
        { name: "Auction", value: catObj.type_pct[0] },
        { name: "Buy Now", value: catObj.type_pct[1] },
        { name: "Reserve", value: catObj.type_pct[2] },
      ]
    : allTypes.map((t) => ({ name: t.name, value: t.pct }));

  /* ── price dist — per category or overall ── */
  const priceLabels = ["<$5", "$5-15", "$15-25", "$25-50", "$50-100", "$100+"];
  const priceChartData = catObj?.price_pct
    ? priceLabels.map((label, i) => ({ label, pct: catObj.price_pct[i] ?? 0 }))
    : allPriceDist.map((p) => ({ label: p.label, pct: p.pct }));

  /* ── bar charts ── */
  const salesChartData = [...allCats]
    .sort((a, b) => b.vol - a.vol)
    .slice(0, 8)
    .map((c) => ({ category: c.name, count: c.vol }));

  const stChartData = [...allCats]
    .sort((a, b) => b.str - a.str)
    .slice(0, 8)
    .map((c) => ({ category: c.name, str: c.str }));

  /* ── click handler — attached to <Bar> via onClick prop on each Cell indirectly
        Recharts fires Bar onClick with (data, index) where data.activePayload exists
        when clicking on BarChart, but most reliable way is custom shape or
        wrapping each bar. Safest: use BarChart onClick + get name from payload. ── */
  const handleBarClick = (barData) => {
    // barData here is the row object passed by Recharts Bar onClick: { category, count/str, ... }
    const cat =
      barData?.category ?? barData?.activePayload?.[0]?.payload?.category;
    if (cat) setActiveCat((prev) => (prev === cat ? null : cat));
  };

  /* ── render ── */
  return (
    <>
      <FontLink />
      <GlobalStyle />
      <div className="rpt-page">
        {/* HEADER */}
        <div className="rpt-header">
          <div>
            <h1>ThriftOps Market Data</h1>
            <p>ShopGoodwill Snapshot · {today}</p>
          </div>
          <div className="rpt-header-right">
            <span className="rpt-badge">
              Live Indexing: {Number(kpis.total_volume ?? 0).toLocaleString()}{" "}
              listings
            </span>
            <span className="rpt-badge rpt-badge-live">
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#0f9e6e",
                  marginRight: 6,
                }}
              />
              Live Data
            </span>
            <span
              className="rpt-badge rpt-badge-export"
              onClick={() => setShowModal(true)}
            >
              Export ›
            </span>
          </div>
        </div>

        {/* METRIC CARDS */}
        <div className="rpt-metric-grid">
          {[
            {
              cls: "rpt-m-blue",
              label: "Estimated Volume",
              value: mTotal,
              sub: mTotalSub,
            },
            {
              cls: "rpt-m-green",
              label: "Avg. Sale Price",
              value: mPrice,
              sub: mPriceSub,
            },
            {
              cls: "rpt-m-orange",
              label: "7-Day Sell-Through",
              value: mStr,
              sub: mStrSub,
            },
            {
              cls: "rpt-m-purple",
              label: "Bidding Success",
              value: mAuction,
              sub: mAuctionSub,
            },
          ].map((m, i) => (
            <div key={i} className={`rpt-metric ${m.cls}`}>
              <div className="rpt-metric-label">{m.label}</div>
              <div className="rpt-metric-value">{m.value}</div>
              <div className="rpt-metric-sub">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* CHART ROW 1 */}
        <div className="rpt-chart-grid">
          {/* Sales Count */}
          <div className="rpt-chart-card">
            <div className="rpt-card-title">Top Categories by Sales Count</div>
            <div className="rpt-card-desc">
              Click bar to isolate category
              {activeCat && (
                <button
                  className="rpt-active-filter"
                  onClick={() => setActiveCat(null)}
                >
                  {activeCat} ✕
                </button>
              )}
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={salesChartData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="rgba(0,0,0,0.04)"
                />
                <XAxis
                  type="number"
                  tick={{ fontFamily: "DM Mono", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  width={170}
                  tick={{ fontFamily: "DM Mono", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Bar
                  dataKey="count"
                  radius={[0, 4, 4, 0]}
                  onClick={(barData) => handleBarClick(barData)}
                  style={{ cursor: "pointer" }}
                >
                  {salesChartData.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={
                        activeCat && activeCat !== entry.category
                          ? C_DIM_S
                          : C_SALES
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* STR */}
          <div className="rpt-chart-card">
            <div className="rpt-card-title">
              Top Categories by Sell-Through %
            </div>
            <div className="rpt-card-desc">Market demand intensity</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stChartData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="rgba(0,0,0,0.04)"
                />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontFamily: "DM Mono", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  width={170}
                  tick={{ fontFamily: "DM Mono", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={<ChartTooltip suffix="%" />}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Bar
                  dataKey="str"
                  radius={[0, 4, 4, 0]}
                  onClick={(barData) => handleBarClick(barData)}
                  style={{ cursor: "pointer" }}
                >
                  {stChartData.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={
                        activeCat && activeCat !== entry.category
                          ? C_DIM_ST
                          : C_ST
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART ROW 2 */}
        <div className="rpt-chart-grid">
          {/* Listing Formats */}
          <div className="rpt-chart-card">
            <div className="rpt-card-title">Listing Formats</div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={typeChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {typeChartData.map((_, i) => (
                    <Cell key={i} fill={C_TYPE[i % C_TYPE.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{ fontFamily: "DM Mono", fontSize: 11 }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontFamily: "DM Mono", fontSize: 10 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Price Distribution */}
          <div className="rpt-chart-card">
            <div className="rpt-card-title">Price Distribution</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={priceChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(0,0,0,0.04)"
                />
                <XAxis
                  dataKey="label"
                  tick={{ fontFamily: "DM Mono", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontFamily: "DM Mono", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={<ChartTooltip suffix="%" />}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Bar dataKey="pct" fill={C_PRICE} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* EXPORT MODAL */}
      {showModal && (
        <div className="rpt-overlay">
          <div className="rpt-modal">
            <h2>Export Report</h2>
            <p>Enter email to receive report</p>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="rpt-modal-btns">
              <button
                className="rpt-modal-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="rpt-modal-send" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reports;
