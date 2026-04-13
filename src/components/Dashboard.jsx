import React from "react";
import KPICards from "../components/KPICards";
import Charts from "../components/Charts";
import AuctionTable from "../components/AuctionTable";
import ExportCSV from "../components/ExportCSV";

const Dashboard = ({ filtered, apiStats, page, setPage, loading }) => {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 text-sm">
              Real-time auction performance metrics
            </p>
          </div>
          <ExportCSV
            data={filtered || []} // fallback to empty array
            buttonClass="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 font-medium text-sm"
          />
        </div>

        {/* KPI Cards */}
        <KPICards stats={apiStats} data={filtered} />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Charts data={filtered} type="priceDistribution" />
          <Charts data={filtered} type="categoryVolume" />
        </div>

        {/* Table */}
        {loading.auctions || loading.search ? (
          <div className="animate-pulse space-y-3 p-4">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 rounded w-4/6"></div>
          </div>
        ) : (
          <AuctionTable data={filtered || []} />
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Prev
        </button>

        <span className="px-4 py-2 font-semibold">Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Dashboard;
