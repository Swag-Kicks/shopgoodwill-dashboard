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

const FontLink = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
  </>
);

const GlobalStyle = () => (
  <style>{`
    .rpt *, .rpt *::before, .rpt *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .rpt {
      --bg: #f5f3ee; --surface: #ffffff; --surface2: #eeece7;
      --border: rgba(0,0,0,0.1); --text: #1a1917; --muted: #6b6963;
      --accent: #2a5cdb; --accent2: #0f9e6e; --accent3: #d4420f; --accent4: #8b3fd8;
      --amber: #c97b10; --radius: 12px;
      font-family: 'Syne', sans-serif;
      background: var(--bg); color: var(--text); min-height: 100vh;
    }
    .rpt-wrap { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .rpt-hero { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border); }
    .rpt-hero-meta { font-family: 'DM Mono', monospace; font-size: 0.68rem; color: var(--muted); margin-bottom: 10px; display: flex; gap: 16px; flex-wrap: wrap; }
    .rpt-hero h1 { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 12px; }
    .rpt-hero-desc { font-size: 1rem; color: var(--muted); line-height: 1.6; max-width: 780px; }
    .rpt-badge-inline { display: inline-block; font-family: 'DM Mono', monospace; font-size: 0.65rem; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 4px 12px; color: var(--muted); margin-top: 12px; }
    .rpt-section { margin-bottom: 2.5rem; }
    .rpt-section > h2 { font-size: 1.1rem; font-weight: 700; letter-spacing: -0.01em; margin-bottom: 4px; }
    .rpt-section > .rpt-sub { font-size: 0.85rem; color: var(--muted); margin-bottom: 1rem; line-height: 1.5; }
    .rpt-metric-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 1.5rem; }
    .rpt-metric { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px 20px; position: relative; overflow: hidden; }
    .rpt-metric::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
    .rpt-m-blue::before   { background: var(--accent); }
    .rpt-m-green::before  { background: var(--accent2); }
    .rpt-m-orange::before { background: var(--accent3); }
    .rpt-m-purple::before { background: var(--accent4); }
    .rpt-metric-label { font-family: 'DM Mono', monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 8px; }
    .rpt-metric-value { font-size: 2rem; font-weight: 700; line-height: 1; }
    .rpt-metric-sub   { font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--muted); margin-top: 6px; }
    .rpt-chart-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
    .rpt-chart-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
    .rpt-card-label { font-family: 'DM Mono', monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 4px; }
    .rpt-card-desc  { font-size: 0.85rem; color: var(--muted); margin-bottom: 14px; display: flex; align-items: center; flex-wrap: wrap; gap: 6px; }
    .rpt-filter-btn { display: inline-flex; align-items: center; gap: 5px; font-family: 'DM Mono', monospace; font-size: 0.65rem; background: var(--accent); color: #fff; border-radius: 999px; padding: 3px 10px; cursor: pointer; border: none; }
    .rpt-filter-btn:hover { background: #1e46b0; }
    .rpt-table-section { margin-bottom: 2.5rem; }
    .rpt-table-section h2 { font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; }
    .rpt-table-section p  { font-size: 0.85rem; color: var(--muted); margin-bottom: 14px; line-height: 1.5; }
    .rpt-table-wrap { overflow-x: auto; }
    .rpt-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; background: var(--surface); border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border); }
    .rpt-table thead th { font-family: 'DM Mono', monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); background: var(--surface2); padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--border); white-space: nowrap; }
    .rpt-table tbody td { padding: 9px 14px; border-bottom: 1px solid rgba(0,0,0,0.05); vertical-align: middle; }
    .rpt-table tbody tr:last-child td { border-bottom: none; }
    .rpt-table tbody tr:hover { background: #faf9f6; }
    .rpt-rank { font-family: 'DM Mono', monospace; color: var(--muted); font-size: 0.7rem; }
    .rpt-cat-name { font-weight: 500; }
    .rpt-bar-cell { display: flex; align-items: center; gap: 8px; }
    .rpt-bar-bg   { flex: 1; height: 6px; background: var(--surface2); border-radius: 3px; min-width: 60px; }
    .rpt-bar-fill { height: 100%; border-radius: 3px; }
    .rpt-val { font-family: 'DM Mono', monospace; font-size: 0.75rem; white-space: nowrap; }
    .rpt-pill { display: inline-block; font-family: 'DM Mono', monospace; font-size: 0.65rem; padding: 2px 8px; border-radius: 999px; font-weight: 500; }
    .rpt-pill-high { background: #e0f5ec; color: #0a6644; }
    .rpt-pill-mid  { background: #e8f0fd; color: #1a3d99; }
    .rpt-pill-low  { background: #fef0e4; color: #8a4200; }
    .rpt-insight-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 2rem; }
    .rpt-insight-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px 20px; border-left: 3px solid transparent; }
    .rpt-ic-blue  { border-left-color: var(--accent); }
    .rpt-ic-green { border-left-color: var(--accent2); }
    .rpt-ic-amber { border-left-color: var(--amber); }
    .rpt-insight-title { font-size: 0.9rem; font-weight: 600; margin-bottom: 5px; }
    .rpt-insight-body  { font-size: 0.8rem; color: var(--muted); line-height: 1.55; }
    .rpt-faq-section { margin-bottom: 2.5rem; }
    .rpt-faq-section h2 { font-size: 1.05rem; font-weight: 700; margin-bottom: 16px; }
    .rpt-faq-item { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); margin-bottom: 8px; overflow: hidden; }
    .rpt-faq-q { padding: 14px 18px; font-size: 0.9rem; font-weight: 500; cursor: pointer; display: flex; justify-content: space-between; align-items: center; user-select: none; }
    .rpt-faq-a { padding: 0 18px 16px; font-size: 0.85rem; color: var(--muted); line-height: 1.65; }
    .rpt-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 50; }
    .rpt-modal { background: #fff; width: 400px; max-width: 90vw; padding: 24px; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
    .rpt-modal h2 { font-size: 18px; font-weight: 700; margin: 0 0 8px; }
    .rpt-modal p  { font-family: 'DM Mono', monospace; font-size: 12px; color: #6b6963; margin: 0 0 14px; }
    .rpt-modal input { width: 100%; border: 1px solid rgba(0,0,0,0.15); padding: 10px 12px; border-radius: 8px; margin-bottom: 14px; font-family: 'DM Mono', monospace; font-size: 13px; outline: none; }
    .rpt-modal-btns { display: flex; justify-content: flex-end; gap: 8px; }
    .rpt-modal-cancel { padding: 8px 16px; font-size: 13px; border: 1px solid rgba(0,0,0,0.15); border-radius: 8px; background: none; cursor: pointer; }
    .rpt-modal-send   { padding: 8px 16px; font-size: 13px; background: #1a1917; color: #fff; border: none; border-radius: 8px; cursor: pointer; }
    .rpt-header-right { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    .rpt-badge { font-family: 'DM Mono', monospace; font-size: 0.7rem; background: var(--surface2); border: 1px solid var(--border); border-radius: 999px; padding: 6px 14px; color: var(--muted); }
    .rpt-badge-live   { background: #f0fdf4; color: #0f9e6e; border-color: #0f9e6e30; }
    .rpt-badge-export { background: #1a1917; color: #fff; cursor: pointer; border: none; }
    .rpt-legend { display: flex; flex-wrap: wrap; gap: 12px; font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--muted); margin-bottom: 10px; }
    .rpt-legend-item { display: flex; align-items: center; gap: 5px; }
    .rpt-legend-dot  { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
    .rpt-footer { border-top: 1px solid var(--border); padding-top: 1.5rem; margin-top: 1rem; font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--muted); line-height: 1.8; }
    @keyframes rpt-spin { to { transform: rotate(360deg); } }
    .rpt-spinner { width: 36px; height: 36px; border: 3px solid #2a5cdb; border-top-color: transparent; border-radius: 50%; animation: rpt-spin 0.8s linear infinite; margin: 0 auto 12px; }
    @media (max-width: 900px) {
      .rpt-metric-grid  { grid-template-columns: repeat(2, 1fr); }
      .rpt-chart-grid   { grid-template-columns: 1fr; }
      .rpt-insight-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .rpt-wrap { padding: 1rem; }
      .rpt-metric-grid { grid-template-columns: 1fr 1fr; }
    }
  `}</style>
);

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

const Pill = ({ value }) => {
  const n = parseFloat(value);
  const cls =
    n >= 55
      ? "rpt-pill rpt-pill-high"
      : n >= 35
        ? "rpt-pill rpt-pill-mid"
        : "rpt-pill rpt-pill-low";
  return <span className={cls}>{value}%</span>;
};

const FaqItem = ({ q, children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="rpt-faq-item">
      <div className="rpt-faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span style={{ fontSize: "1.1rem", color: "#6b6963", marginLeft: 12 }}>
          {open ? "−" : "+"}
        </span>
      </div>
      {open && <div className="rpt-faq-a">{children}</div>}
    </div>
  );
};

const C_SALES = "#2a5cdb";
const C_ST = "#0f9e6e";
const C_TYPE = ["#2a5cdb", "#c97b10", "#0f9e6e"]; // Auction, Reserve, Buy Now
const C_PRICE = "#8b3fd8";
const C_DIM_S = "rgba(42,92,219,0.18)";
const C_DIM_ST = "rgba(15,158,110,0.18)";

/* ══════════════════════════════════════════════════════════════════════════ */
const Reports = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [activeCat, setActiveCat] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = React.useState("");

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

  if (loading)
    return (
      <>
        <FontLink />
        <GlobalStyle />
        <div
          className="rpt"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
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
        <div className="rpt">
          <div
            className="rpt-wrap"
            style={{
              color: "#d4420f",
              fontFamily: "'DM Mono',monospace",
              paddingTop: "2rem",
            }}
          >
            API Error: {error.message}
          </div>
        </div>
      </>
    );
  if (!data) return null;

  /* ── Map existing API fields ─────────────────────────────────────────────── */
  // kpis: { total_volume, avg_price, sell_through, total_bids, total_gmv }
  // categories[]: { name, vol, revenue, avg_price, sold, str, type_pct, price_pct }
  // listing_types[]: { name, count, pct }
  // price_distribution[]: { label, count, pct }
  // NOTE: ship_distribution not in API — hidden from UI
  // NOTE: st_categories not in API — derived by sorting categories by str

  const kpis = data.kpis ?? {};
  const categories = data.categories ?? [];
  const listingTypes = data.listing_types ?? [];
  const priceDist = data.price_distribution ?? [];
  const dateFrom = data.date_from ?? "";
  const dateTo = data.date_to ?? "";

  const totalVolume = Number(kpis.total_volume ?? 0);
  const avgPrice = Number(kpis.avg_price ?? 0);
  const sellThrough = Number(kpis.sell_through ?? 0); // overall sell-through from API
  const totalBids = Number(kpis.total_bids ?? 0);
  // sold_rate = bids / total (overall conversion)
  const soldRate =
    totalVolume > 0 ? Math.round((totalBids / totalVolume) * 10) / 10 : 0;
  const unsoldRate = (100 - soldRate).toFixed(1);

  const fmt2 = (n) =>
    Number(n ?? 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  /* ── Selected category ── */
  const catObj = activeCat
    ? (categories.find((c) => c.name === activeCat) ?? null)
    : null;

  /* ── Metric card values ── */
  // catObj.str = sell-through % for that category
  const mTotal = catObj
    ? Number(catObj.vol).toLocaleString()
    : totalVolume.toLocaleString();
  const mPrice = catObj ? `$${fmt2(catObj.avg_price)}` : `$${fmt2(avgPrice)}`;
  const mStr = catObj ? `${catObj.str}%` : `${sellThrough}%`;
  const mSold = catObj ? `${catObj.str}%` : `${soldRate}%`;
  const mTotalSub = catObj ? `In ${activeCat}` : "All categories combined";
  const mPriceSub = catObj ? `In ${activeCat}` : "Across all listings";
  const mStrSub = catObj ? `In ${activeCat}` : "7-day sell-through rate";
  const mSoldSub = catObj
    ? `Sold rate in ${activeCat}`
    : "Bids received or buy-now";

  /* ── Chart data ── */
  const typeChartData = catObj?.type_pct
    ? [
        { name: "Auction", value: catObj.type_pct[0] },
        { name: "Reserve", value: catObj.type_pct[1] },
        { name: "Buy Now", value: catObj.type_pct[2] },
      ]
    : listingTypes.map((t) => ({ name: t.name, value: t.pct }));

  const priceChartData = catObj?.price_pct
    ? ["<$5", "$5-15", "$15-25", "$25-50", "$50-100", "$100+"].map(
        (label, i) => ({ label, pct: catObj.price_pct[i] ?? 0 }),
      )
    : priceDist.map((p) => ({ label: p.label, pct: p.pct }));

  /* ── Bar chart datasets — top 8 ── */
  const maxSold = Math.max(...categories.map((c) => c.sold ?? 0), 1);
  const maxStr = Math.max(...categories.map((c) => c.str ?? 0), 1);

  const salesBarData = [...categories]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 8)
    .map((c) => ({ category: c.name, count: c.sold }));

  // st_categories = same categories sorted by str (sell-through)
  const stBarData = [...categories]
    .sort((a, b) => b.str - a.str)
    .slice(0, 8)
    .map((c) => ({ category: c.name, str: c.str }));

  // Top 20 by str for table
  const stTableData = [...categories]
    .sort((a, b) => b.str - a.str)
    .slice(0, 20);

  const handleBarClick = (rowData) => {
    const cat = rowData?.category;
    if (cat) setActiveCat((prev) => (prev === cat ? null : cat));
  };

  /* ── Legend % ── */
  const auctionPct = listingTypes.find((t) => t.name === "Auction")?.pct ?? 0;
  const buynowPct = listingTypes.find((t) => t.name === "Buy Now")?.pct ?? 0;
  const reservePct = listingTypes.find((t) => t.name === "Reserve")?.pct ?? 0;

  /* ── Dynamic insights from API data ─────────────────────────────────────── */
  // Insight 1: highest avg_price among top performers (str > overall sell_through)
  const topValueCat = [...categories]
    .filter((c) => c.str > sellThrough)
    .sort((a, b) => b.avg_price - a.avg_price)[0];

  // Insight 2: grabbag vs non-grabbag
  const grabbagCats = categories.filter((c) =>
    c.name.toLowerCase().includes("grabbag"),
  );
  const nonGrabbagCats = categories.filter(
    (c) => !c.name.toLowerCase().includes("grabbag"),
  );
  const avgGrabStr = grabbagCats.length
    ? (grabbagCats.reduce((s, c) => s + c.str, 0) / grabbagCats.length).toFixed(
        1,
      )
    : null;
  const avgSingleStr = nonGrabbagCats.length
    ? (
        nonGrabbagCats.reduce((s, c) => s + c.str, 0) / nonGrabbagCats.length
      ).toFixed(1)
    : null;
  const avgGrabPrice = grabbagCats.length
    ? (
        grabbagCats.reduce((s, c) => s + c.avg_price, 0) / grabbagCats.length
      ).toFixed(2)
    : null;
  const avgSinglePrice = nonGrabbagCats.length
    ? (
        nonGrabbagCats.reduce((s, c) => s + c.avg_price, 0) /
        nonGrabbagCats.length
      ).toFixed(2)
    : null;

  // Insight 3: worst sell-through high-volume category
  const worstCat = [...categories]
    .filter((c) => c.vol >= 500)
    .sort((a, b) => a.str - b.str)[0];

  // Top STR category for subtitle
  const topStrCat = stTableData[0];

  return (
    <>
      <FontLink />
      <GlobalStyle />
      <div className="rpt">
        <div className="rpt-wrap">
          {/* ── Hero ── */}
          <header className="rpt-hero">
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div>
                <div className="rpt-hero-meta">
                  <span>Published: {dateTo}</span>
                  <span>Source: ShopGoodwill upload snapshot</span>
                  <span>Listings analysed: {totalVolume.toLocaleString()}</span>
                </div>
                <h1>ShopGoodwill Sales Report: Best Categories to Flip</h1>
                <p className="rpt-hero-desc">
                  A data-driven analysis of {totalVolume.toLocaleString()}{" "}
                  ShopGoodwill auction and buy-now listings covering
                  sell-through rates, average prices, and listing patterns
                  across all major categories.
                </p>
              </div>
              <div className="rpt-header-right">
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
                <button
                  className="rpt-badge rpt-badge-export"
                  onClick={() => setShowModal(true)}
                >
                  Export ›
                </button>
              </div>
            </div>
            <span className="rpt-badge-inline">
              Data: {dateFrom} – {dateTo} · Sold = bids received or buy-now
              completed · Sell-through = sold / total listings
            </span>
          </header>

          {/* ══ SECTION 1 — Key Numbers ══ */}
          <section className="rpt-section">
            <h2>ShopGoodwill Key Numbers at a Glance</h2>
            <p className="rpt-sub">
              Across all {totalVolume.toLocaleString()} listings, {unsoldRate}%
              of items did not receive a bid. Average listing price was $
              {fmt2(avgPrice)}.
            </p>
            <div className="rpt-metric-grid">
              {[
                {
                  cls: "rpt-m-blue",
                  label: "Total Listings",
                  value: mTotal,
                  sub: mTotalSub,
                },
                {
                  cls: "rpt-m-green",
                  label: "Avg. Listing Price",
                  value: mPrice,
                  sub: mPriceSub,
                },
                {
                  cls: "rpt-m-orange",
                  label: "Sell-Through Rate",
                  value: mStr,
                  sub: mStrSub,
                },
                {
                  cls: "rpt-m-purple",
                  label: "Overall Sold Rate",
                  value: mSold,
                  sub: mSoldSub,
                },
              ].map((m, i) => (
                <div key={i} className={`rpt-metric ${m.cls}`}>
                  <div className="rpt-metric-label">{m.label}</div>
                  <div className="rpt-metric-value">{m.value}</div>
                  <div className="rpt-metric-sub">{m.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ══ SECTION 2 — Charts + Tables ══ */}
          <section className="rpt-section">
            <h2>Which ShopGoodwill Categories Sell the Most?</h2>
            <p className="rpt-sub">
              Jewelry dominates by raw sales volume, but the highest
              sell-through rates belong to {topStrCat?.name} ({topStrCat?.str}%)
              and other high-demand niches. Click any bar or table row to filter
              all panels.
            </p>

            <div className="rpt-chart-grid" style={{ marginBottom: 12 }}>
              {/* Sales count chart */}
              <div className="rpt-chart-card">
                <div className="rpt-card-label">Top 8 by items sold</div>
                <div className="rpt-card-desc">
                  Total sold — click to filter
                  {activeCat && (
                    <button
                      className="rpt-filter-btn"
                      onClick={() => setActiveCat(null)}
                    >
                      {activeCat} ✕
                    </button>
                  )}
                </div>
                <div className="rpt-legend">
                  <span className="rpt-legend-item">
                    <span
                      className="rpt-legend-dot"
                      style={{ background: "#2a5cdb" }}
                    />
                    Items sold
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={salesBarData} layout="vertical">
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
                      tickFormatter={(v) => (v / 1000).toFixed(1) + "k"}
                    />
                    <YAxis
                      type="category"
                      dataKey="category"
                      width={165}
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
                      onClick={handleBarClick}
                      style={{ cursor: "pointer" }}
                    >
                      {salesBarData.map((e) => (
                        <Cell
                          key={e.category}
                          fill={
                            activeCat && activeCat !== e.category
                              ? C_DIM_S
                              : C_SALES
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* STR chart */}
              <div className="rpt-chart-card">
                <div className="rpt-card-label">Top 8 by sell-through %</div>
                <div className="rpt-card-desc">
                  % of listings sold — click to filter
                </div>
                <div className="rpt-legend">
                  <span className="rpt-legend-item">
                    <span
                      className="rpt-legend-dot"
                      style={{ background: "#0f9e6e" }}
                    />
                    Sell-through %
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={stBarData} layout="vertical">
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
                      tickFormatter={(v) => v + "%"}
                    />
                    <YAxis
                      type="category"
                      dataKey="category"
                      width={165}
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
                      onClick={handleBarClick}
                      style={{ cursor: "pointer" }}
                    >
                      {stBarData.map((e) => (
                        <Cell
                          key={e.category}
                          fill={
                            activeCat && activeCat !== e.category
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

            {/* Table 1 — Top 20 by sold count */}
            <div className="rpt-table-section">
              <h2>Top 20 ShopGoodwill Categories by Items Sold</h2>
              <p>
                Ranked by listings that received at least one bid or were
                completed as buy-now sales. Overall sell-through: {sellThrough}
                %.
              </p>
              <div className="rpt-table-wrap">
                <table className="rpt-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Category</th>
                      <th>Items sold</th>
                      <th>Sell-through</th>
                      <th>Avg price</th>
                      <th>Total listings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...categories]
                      .sort((a, b) => b.sold - a.sold)
                      .slice(0, 20)
                      .map((c, i) => (
                        <tr
                          key={c.name}
                          style={{
                            cursor: "pointer",
                            background: activeCat === c.name ? "#f0f4ff" : "",
                          }}
                          onClick={() =>
                            setActiveCat((prev) =>
                              prev === c.name ? null : c.name,
                            )
                          }
                        >
                          <td className="rpt-rank">{i + 1}</td>
                          <td className="rpt-cat-name">{c.name}</td>
                          <td>
                            <div className="rpt-bar-cell">
                              <div className="rpt-bar-bg">
                                <div
                                  className="rpt-bar-fill"
                                  style={{
                                    width: `${(c.sold / maxSold) * 100}%`,
                                    background: "#2a5cdb",
                                  }}
                                />
                              </div>
                              <span className="rpt-val">
                                {Number(c.sold).toLocaleString()}
                              </span>
                            </div>
                          </td>
                          <td>
                            <Pill value={c.str} />
                          </td>
                          <td>${fmt2(c.avg_price)}</td>
                          <td>{Number(c.vol).toLocaleString()}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2 — Top 20 by sell-through */}
            <div className="rpt-table-section">
              <h2>Top 20 ShopGoodwill Categories by Sell-Through Rate</h2>
              <p>
                Ranked by sell-through % (sold ÷ total listed). Overall
                sell-through: {sellThrough}%.
              </p>
              <div className="rpt-table-wrap">
                <table className="rpt-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Category</th>
                      <th>Sell-through</th>
                      <th>Items sold</th>
                      <th>Avg price</th>
                      <th>Total listings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stTableData.map((c, i) => (
                      <tr
                        key={c.name}
                        style={{
                          cursor: "pointer",
                          background: activeCat === c.name ? "#f0f4ff" : "",
                        }}
                        onClick={() =>
                          setActiveCat((prev) =>
                            prev === c.name ? null : c.name,
                          )
                        }
                      >
                        <td className="rpt-rank">{i + 1}</td>
                        <td className="rpt-cat-name">{c.name}</td>
                        <td>
                          <div className="rpt-bar-cell">
                            <div className="rpt-bar-bg">
                              <div
                                className="rpt-bar-fill"
                                style={{
                                  width: `${(c.str / maxStr) * 100}%`,
                                  background: "#0f9e6e",
                                }}
                              />
                            </div>
                            <span className="rpt-val">{c.str}%</span>
                          </div>
                        </td>
                        <td>{Number(c.sold).toLocaleString()}</td>
                        <td>${fmt2(c.avg_price)}</td>
                        <td>{Number(c.vol).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ══ SECTION 3 — Detail Charts ══ */}
          <section className="rpt-section">
            <h2>Listing Type &amp; Price Breakdown</h2>
            <p className="rpt-sub">
              Click a category above to filter these panels. By default they
              show figures across all {totalVolume.toLocaleString()} listings.
            </p>

            <div className="rpt-chart-grid">
              {/* Listing types donut */}
              <div className="rpt-chart-card">
                <div className="rpt-card-label">Listing type breakdown</div>
                <div className="rpt-card-desc">
                  Auction vs. reserve vs. buy now
                </div>
                <div className="rpt-legend">
                  <span className="rpt-legend-item">
                    <span
                      className="rpt-legend-dot"
                      style={{ background: "#2a5cdb" }}
                    />
                    Auction ({auctionPct}%)
                  </span>
                  <span className="rpt-legend-item">
                    <span
                      className="rpt-legend-dot"
                      style={{ background: "#c97b10" }}
                    />
                    Reserve ({reservePct}%)
                  </span>
                  <span className="rpt-legend-item">
                    <span
                      className="rpt-legend-dot"
                      style={{ background: "#0f9e6e" }}
                    />
                    Buy now ({buynowPct}%)
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={typeChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
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

              {/* Price distribution */}
              <div className="rpt-chart-card">
                <div className="rpt-card-label">Price distribution</div>
                <div className="rpt-card-desc">
                  % of listings by price bucket
                </div>
                <div className="rpt-legend">
                  <span className="rpt-legend-item">
                    <span
                      className="rpt-legend-dot"
                      style={{ background: "#8b3fd8" }}
                    />
                    % of listings
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={240}>
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
          </section>

          {/* ══ SECTION 4 — Insights (computed from API data) ══ */}
          <section className="rpt-section">
            <h2>Key Insights for ShopGoodwill Resellers</h2>
            <p className="rpt-sub">
              Three patterns stand out from the {dateFrom}–{dateTo} data.
            </p>
            <div className="rpt-insight-grid">
              <div className="rpt-insight-card rpt-ic-blue">
                <div className="rpt-insight-title">
                  {topValueCat
                    ? `${topValueCat.name} is a high-value opportunity`
                    : "High-value categories are underlisted"}
                </div>
                <div className="rpt-insight-body">
                  {topValueCat
                    ? `${topValueCat.name} has a ${topValueCat.str}% sell-through rate and a $${fmt2(topValueCat.avg_price)} average price — the highest value-per-listing among strong-performing categories — with only ${Number(topValueCat.vol).toLocaleString()} total listings. Strong demand relative to supply.`
                    : "Some of the highest-value categories have strong sell-through rates relative to their listing volume."}
                </div>
              </div>

              <div className="rpt-insight-card rpt-ic-green">
                <div className="rpt-insight-title">
                  Grabbags dramatically outperform singles
                </div>
                <div className="rpt-insight-body">
                  {avgGrabStr && avgSingleStr
                    ? `Grabbag listings sell at ${avgGrabStr}% on average with a $${avgGrabPrice} avg price vs individual items at ${avgSingleStr}% sold and $${avgSinglePrice} avg. Bundling boosts both revenue per lot and sell-through rate.`
                    : "Grabbag listings consistently sell faster and at higher prices than individual items in the same category."}
                </div>
              </div>

              <div className="rpt-insight-card rpt-ic-amber">
                <div className="rpt-insight-title">
                  {unsoldRate}% of listings go unsold — pricing is the lever
                </div>
                <div className="rpt-insight-body">
                  {worstCat
                    ? `The overall sold rate is ${soldRate}%, meaning nearly half of all inventory doesn't sell. ${worstCat.name} has only ${worstCat.str}% sell-through despite ${Number(worstCat.vol).toLocaleString()} listings. Lower opening bids and shorter listing windows would unlock latent demand.`
                    : `The overall sold rate is ${soldRate}%, meaning nearly half of all inventory doesn't sell. Lower opening bids and shorter listing windows would unlock latent demand.`}
                </div>
              </div>
            </div>
          </section>

          {/* ══ SECTION 5 — FAQ ══ */}
          <section className="rpt-faq-section">
            <h2>Frequently Asked Questions About ShopGoodwill</h2>

            <FaqItem q="What are the best categories to flip on ShopGoodwill?">
              Based on recent data, the best categories by sell-through rate are{" "}
              <strong>
                {stTableData[0]?.name} ({stTableData[0]?.str}%)
              </strong>
              ,{" "}
              <strong>
                {stTableData[1]?.name} ({stTableData[1]?.str}%)
              </strong>
              , and{" "}
              <strong>
                {stTableData[2]?.name} ({stTableData[2]?.str}%)
              </strong>
              . For pure sales volume, {categories[0]?.name},{" "}
              {categories[1]?.name}, and {categories[2]?.name} lead.
            </FaqItem>

            <FaqItem q="What is the sell-through rate for LEGO on ShopGoodwill?">
              {(() => {
                const lego = categories.find((c) => c.name === "LEGO");
                return lego ? (
                  <>
                    LEGO has a <strong>{lego.str}% sell-through rate</strong>{" "}
                    with {Number(lego.sold).toLocaleString()} sold out of{" "}
                    {Number(lego.vol).toLocaleString()} listings and an average
                    price of ${fmt2(lego.avg_price)}. It is one of the
                    strongest-performing non-jewelry categories.
                  </>
                ) : (
                  "LEGO typically has a strong sell-through rate and is one of the highest-volume non-jewelry categories."
                );
              })()}
            </FaqItem>

            <FaqItem q="What is the average price of items sold on ShopGoodwill?">
              The average listing price across all{" "}
              {totalVolume.toLocaleString()} listings is{" "}
              <strong>${fmt2(avgPrice)}</strong>. The highest averages by
              category:{" "}
              {[...categories]
                .sort((a, b) => b.avg_price - a.avg_price)
                .slice(0, 3)
                .map((c) => `${c.name} ($${fmt2(c.avg_price)})`)
                .join(", ")}
              . The lowest:{" "}
              {[...categories]
                .sort((a, b) => a.avg_price - b.avg_price)
                .slice(0, 2)
                .map((c) => `${c.name} ($${fmt2(c.avg_price)})`)
                .join(" and ")}
              .
            </FaqItem>

            <FaqItem q="What percentage of ShopGoodwill listings receive bids?">
              Overall, <strong>{sellThrough}% of listings sell</strong> based on
              the {dateFrom}–{dateTo} snapshot. The highest sell-through
              categories are{" "}
              {stTableData
                .slice(0, 3)
                .map((c) => `${c.name} (${c.str}%)`)
                .join(", ")}
              . The lowest are{" "}
              {[...categories]
                .sort((a, b) => a.str - b.str)
                .slice(0, 2)
                .map((c) => `${c.name} (${c.str}%)`)
                .join(" and ")}
              .
            </FaqItem>

            <FaqItem q="Is retro gaming a good category to buy on ShopGoodwill?">
              {(() => {
                const gaming = categories.filter((c) =>
                  ["LEGO", "Sports Cards", "Trading Cards"].some((k) =>
                    c.name.includes(k),
                  ),
                );
                return gaming.length > 0 ? (
                  <>
                    Yes — categories like{" "}
                    <strong>
                      {gaming.map((c) => `${c.name} (${c.str}%)`).join(", ")}
                    </strong>{" "}
                    show strong sell-through rates and competitive average
                    prices on ShopGoodwill.
                  </>
                ) : (
                  "Yes — collectibles and gaming categories consistently show strong sell-through rates on ShopGoodwill."
                );
              })()}
            </FaqItem>

            <FaqItem q="Which ShopGoodwill categories have the highest average prices?">
              {[...categories]
                .sort((a, b) => b.avg_price - a.avg_price)
                .slice(0, 5)
                .map((c, i) => (
                  <span key={c.name}>
                    {i > 0 ? ", " : ""}
                    <strong>{c.name}</strong> (${fmt2(c.avg_price)})
                  </span>
                ))}{" "}
              are the highest-priced categories. These categories also tend to
              have fewer total listings relative to demand.
            </FaqItem>
          </section>

          {/* ── Footer ── */}
          <footer className="rpt-footer">
            <p>
              <strong>Methodology:</strong> {totalVolume.toLocaleString()}{" "}
              listings analysed from a ShopGoodwill snapshot covering {dateFrom}{" "}
              – {dateTo}. Sell-through = sold listings / total listings × 100.
              Sold = listing received at least one bid (auction) or was
              completed as a buy-now sale. Prices are asking/final prices as
              recorded in the dataset.
            </p>
            <p style={{ marginTop: 8 }}>
              This report is updated with each upload snapshot. Data sourced
              from ShopGoodwill public listing data. Not affiliated with
              Goodwill Industries International.
            </p>
          </footer>
        </div>
      </div>

      {/* ── Export Modal ── */}
      {showModal && (
        <div className="rpt-overlay">
          <div className="rpt-modal">
            <h2>Export Report</h2>
            <p>Enter email to receive this report</p>
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
