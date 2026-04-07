import React, { useEffect, useState } from "react";
// import KPICards from "../components/KPICards";
import Filters from "../components/Filters";
// import AuctionTable from "../components/AuctionTable";
// import ExportCSV from "../components/ExportCSV";
// import Charts from "../components/Charts";
import DashboardHome from "../components/Dashboard";
import Reports from "../components/Reports";
import { fetchAuctions, fetchCategories } from "../services/api";

const Home = () => {
  const [auctions, setAuctions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [apiStats, setApiStats] = useState(null);
  const [listingTypeFilter, setListingTypeFilter] = useState(null);
  const [minBidsFilter, setMinBidsFilter] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [pageView, setPageView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch auctions
  useEffect(() => {
    setLoading(true);
    fetchAuctions(selectedCategory, page)
      .then((data) => {
        if (!data) return;

        setAuctions(data.listings || []);
        setFiltered(data.listings || []);
        setApiStats({
          total_count: data.total_count || 0,
          avg_price: data.avg_price || 0,
          total_bid_count: data.total_bid_count || 0,
          avg_bid_number: data.avg_bid_number || 0,
        });
      })
      .finally(() => setLoading(false));
  }, [selectedCategory, page]);
  useEffect(() => {
    fetchCategories().then((data) => {
      if (!data) return;

      // sirf names chahiye filter ke liye
      const cats = data.map((c) => c.full_category_path || c.category_name);
      setAvailableCategories(cats);
    });
  }, []);
  // Handle filters
  const handleFilterChange = (filter) => {
    if (filter.category !== undefined) {
      setSelectedCategory(filter.category);
      setCategory(filter.category);
      setPage(1);
    }
    if (filter.listingType !== undefined)
      setListingTypeFilter(filter.listingType);
    if (filter.minBids !== undefined) setMinBidsFilter(filter.minBids);
  };

  // Apply non-category filters
  useEffect(() => {
    let data = [...(auctions || [])];
    if (listingTypeFilter)
      data = data.filter((d) => d.listing_type === listingTypeFilter);
    if (minBidsFilter) data = data.filter((d) => d.num_bids >= minBidsFilter);
    setFiltered(data);
  }, [auctions, listingTypeFilter, minBidsFilter]);

  // const categories = [
  //   "all",
  //   ...new Set((auctions || []).map((a) => a.full_category_path)),
  // ];
  const listingTypes = [
    ...new Set((auctions || []).map((a) => a.listing_type)),
  ];

  if (loading) return <div className="p-4 text-xl font-bold">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r border-slate-200 flex flex-col p-6 gap-6 shadow-lg
                    fixed lg:relative inset-y-0 left-0 transform lg:translate-x-0 transition-transform duration-300 ease-in-out z-50
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200 cursor-pointer hover:bg-gray-50">
          <div className="w-10 h-10 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <span className="font-bold text-slate-900 text-lg">AUCTIONLY</span>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-6 space-y-2">
          <button
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 w-full text-left"
            onClick={() => setPageView("dashboard")}
          >
            Dashboard
          </button>
          <button
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 w-full text-left"
            onClick={() => setPageView("reports")}
          >
            Reports
          </button>
        </nav>

        {/* Filters Section */}
        <div className="flex-1 overflow-y-auto mt-4">
          <h3 className="text-slate-500 font-semibold text-sm mb-2 uppercase tracking-wide">
            Filters
          </h3>
          <div className="space-y-4">
            <Filters
              categories={availableCategories}
              listingTypes={listingTypes}
              selectedCategory={category} // <-- use it
              // selectedCategory={selectedCategory}
              selectedListingType={listingTypeFilter}
              selectedMinBids={minBidsFilter}
              onFilterChange={handleFilterChange}
              sidebar
            />
          </div>
        </div>

        <div className="mt-auto text-center text-slate-400 text-xs">
          © 2026 Auctionaly
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded shadow-lg"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        ☰
      </button>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {pageView === "dashboard" && (
          <DashboardHome
            filtered={filtered || []}
            apiStats={apiStats}
            page={page}
            setPage={setPage}
          />
        )}
        {pageView === "reports" && <Reports />}
      </main>
    </div>
  );
};

export default Home;
