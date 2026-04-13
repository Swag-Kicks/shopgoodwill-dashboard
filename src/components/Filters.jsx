import React, { useState, useEffect } from "react";

const Filters = ({
  categories = [],
  onFilterChange,
  sidebar,
  selectedCategory = "all",
  selectedMinBids = 0,
  selectedSearch = "",
}) => {
  const [minBids, setMinBids] = useState(selectedMinBids);

  useEffect(() => {
    setMinBids(selectedMinBids);
  }, [selectedMinBids]);

  return (
    <div className={`space-y-6 ${sidebar ? "mt-4" : ""}`}>
      {/* SEARCH */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Search</label>
        <input
          type="text"
          value={selectedSearch}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          placeholder="Item title..."
          className="w-full pl-3 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* CATEGORY */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* MIN BIDS */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Min Bids</label>
        <input
          type="number"
          value={minBids}
          onChange={(e) => {
            const value = Number(e.target.value);
            setMinBids(value);
            onFilterChange({ minBids: value });
          }}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none"
        />
      </div>
    </div>
  );
};

export default Filters;
