import React, { useState, useEffect } from "react";

const Filters = ({
  categories = [],
  listingTypes = [],
  onFilterChange,
  sidebar,
  selectedCategory = "all",
  selectedListingType = null,
  selectedMinBids = 0,
}) => {
  const [search, setSearch] = useState("");
  const [minBids, setMinBids] = useState(selectedMinBids);

  useEffect(() => setMinBids(selectedMinBids), [selectedMinBids]);

  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  const handleMinBidsChange = (e) => {
    const value = Number(e.target.value);
    setMinBids(value);
    onFilterChange({ minBids: value });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({ search: value });
  };

  return (
    <div className={`space-y-6 ${sidebar ? "mt-4" : ""}`}>
      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Search</label>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Item title..."
          className="w-full pl-3 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Category</label>
        <select
          value={selectedCategory} // fully controlled from parent
          onChange={handleCategoryChange}
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

      {/* Min Bids */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Min Bids</label>
        <input
          type="number"
          value={minBids}
          onChange={handleMinBidsChange}
          placeholder="0"
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none"
        />
      </div>
    </div>
  );
};

export default Filters;
