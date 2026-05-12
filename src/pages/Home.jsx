import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import DashboardHome from "../components/Dashboard";
import Reports from "../components/Reports";
import { fetchAuctions, fetchCategories } from "../services/api";

const Home = () => {
  const [auctions, setAuctions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState({ auctions: false, search: false });
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [apiStats, setApiStats] = useState(null);
  const [listingTypeFilter, setListingTypeFilter] = useState(null);
  const [minBidsFilter, setMinBidsFilter] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [pageView, setPageView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading((prev) => ({ ...prev, auctions: true }));
      fetchAuctions({
        category: selectedCategory,
        search: searchFilter,
        minBids: minBidsFilter,
        listingType: listingTypeFilter,
        page,
      })
        .then((data) => {
          if (!data) return;

          setAuctions(data.listings || []);
          setFiltered(data.listings || []);

          setApiStats({
            total_count: data.total_count || 0,
            avg_price: data.avg_price || 0,
            total_bid_count: data.total_bid_count || 0,
            avg_bid_number: data.avg_bid_number || 0,
            total_pages: data.total_pages || 0,
            // ── date range from API ──
            date_from: data.date_from || "",
            date_to: data.date_to || "",
          });
        })
        .finally(() => {
          setLoading((prev) => ({ ...prev, auctions: false }));
        });
    });

    return () => clearTimeout(delay);
  }, [selectedCategory, page, searchFilter, minBidsFilter, listingTypeFilter]);

  useEffect(() => {
    fetchCategories().then((data) => {
      if (!data) return;
      const cats = data.map((c) => c.full_category_path || c.category_name);
      setAvailableCategories(cats);
    });
  }, []);

  const handleFilterChange = (filter) => {
    if (filter.category !== undefined) {
      setSelectedCategory(filter.category);
      setCategory(filter.category);
      setPage(1);
    }
    if (filter.listingType !== undefined)
      setListingTypeFilter(filter.listingType);
    if (filter.minBids !== undefined) setMinBidsFilter(filter.minBids);
    if (filter.search !== undefined) setSearchFilter(filter.search);
  };

  const listingTypes = [
    ...new Set((auctions || []).map((a) => a.listing_type)),
  ];

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
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src="https://www.thriftops.com/assets/e474a0171b0e6a9a49ee107efb844fb3.svg"
              alt="Thriftops"
              className="w-10 h-10 object-contain"
            />
          </div>
          <span className="font-semibold text-slate-900 text-base tracking-wide">
            Thriftops Data
          </span>
        </div>

        {/* Nav */}
        <nav className="mt-6 space-y-2">
          <button
            className={`flex items-center gap-3 p-3 rounded-xl w-full text-left transition-colors ${pageView === "dashboard" ? "bg-indigo-50 text-indigo-700 font-semibold" : "hover:bg-gray-100"}`}
            onClick={() => setPageView("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`flex items-center gap-3 p-3 rounded-xl w-full text-left transition-colors ${pageView === "reports" ? "bg-indigo-50 text-indigo-700 font-semibold" : "hover:bg-gray-100"}`}
            onClick={() => setPageView("reports")}
          >
            Reports
          </button>
        </nav>

        {/* Filters */}
        <div className="flex-1 overflow-y-auto mt-4">
          <h3 className="text-slate-500 font-semibold text-sm mb-2 uppercase tracking-wide">
            Filters
          </h3>
          <div className="space-y-4">
            <Filters
              categories={availableCategories}
              listingTypes={listingTypes}
              selectedCategory={category}
              selectedListingType={listingTypeFilter}
              selectedMinBids={minBidsFilter}
              selectedSearch={searchFilter}
              onFilterChange={handleFilterChange}
              sidebar
            />
          </div>
        </div>

        <div className="mt-auto text-center text-slate-400 text-xs">
          © 2026 Auctionaly
        </div>
      </aside>

      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded shadow-lg"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        ☰
      </button>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {loading.auctions || loading.search ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {pageView === "dashboard" && (
              <DashboardHome
                filtered={filtered || []}
                apiStats={apiStats}
                page={page}
                setPage={setPage}
                loading={loading}
              />
            )}
            {pageView === "reports" && <Reports />}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
