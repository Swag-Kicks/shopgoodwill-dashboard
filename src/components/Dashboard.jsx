import React from "react";
import KPICards from "../components/KPICards";
import Charts from "../components/Charts";
import AuctionTable from "../components/AuctionTable";
import ExportCSV from "../components/ExportCSV";

const Dashboard = ({ filtered, apiStats, page, setPage }) => {
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
        <AuctionTable data={filtered || []} layout="new" />
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
