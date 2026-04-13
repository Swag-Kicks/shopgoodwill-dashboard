import React from "react";

const AuctionTable = ({ data = [] }) => {
  const [sortConfig, setSortConfig] = React.useState([
    { key: "current_price", direction: "desc" },
    { key: "num_bids", direction: "desc" },
  ]);

  React.useEffect(() => {
    setSortConfig([
      { key: "current_price", direction: "desc" },
      { key: "num_bids", direction: "desc" },
    ]);
  }, [data]);
  // SORT FUNCTION
  const sortedData = React.useMemo(() => {
    let sortable = [...data];

    sortable.sort((a, b) => {
      for (let i = 0; i < sortConfig.length; i++) {
        const { key, direction } = sortConfig[i];

        const aVal = parseFloat(a[key]) || 0;
        const bVal = parseFloat(b[key]) || 0;

        if (aVal === bVal) continue;

        if (direction === "asc") {
          return aVal - bVal;
        } else {
          return bVal - aVal;
        }
      }
      return 0;
    });

    return sortable;
  }, [data, sortConfig]);

  // HANDLE SORT CLICK
  const handleSort = (key) => {
    setSortConfig((prev) => {
      const existing = prev.find((s) => s.key === key);

      let newDirection = "desc";

      if (existing) {
        newDirection = existing.direction === "asc" ? "desc" : "asc";
      }

      // remove old key and put at top (IMPORTANT FIX)
      const filtered = prev.filter((s) => s.key !== key);

      return [{ key, direction: newDirection }, ...filtered];
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold">Recent Auctions</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* TABLE HEAD */}
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Item Title</th>

              <th className="px-6 py-4 font-semibold">Category</th>

              {/* PRICE SORT */}
              <th
                className="px-6 py-4 font-semibold cursor-pointer select-none"
                onClick={() => handleSort("current_price")}
              >
                Price{" "}
                <span className="text-xs">
                  {sortConfig.find((s) => s.key === "current_price")
                    ?.direction === "asc"
                    ? "▲"
                    : "▼"}
                </span>
              </th>

              {/* BIDS SORT */}
              <th
                className="px-6 py-4 font-semibold cursor-pointer select-none"
                onClick={() => handleSort("num_bids")}
              >
                Bids{" "}
                <span className="text-xs">
                  {sortConfig.find((s) => s.key === "num_bids")?.direction ===
                  "asc"
                    ? "▲"
                    : "▼"}
                </span>
              </th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="divide-y divide-slate-100 text-sm">
            {sortedData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                {/* TITLE LINK */}
                <td className="px-6 py-4 font-medium">
                  <a
                    href={`https://shopgoodwill.com/item/${item.item_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    {item.title}
                  </a>
                </td>

                {/* CATEGORY */}
                <td className="px-6 py-4 text-slate-500">
                  {item.category_name}
                </td>

                {/* PRICE */}
                <td className="px-6 py-4 text-emerald-600 font-semibold">
                  ${Number(item.current_price).toFixed(2)}
                </td>

                {/* BIDS */}
                <td className="px-6 py-4">{item.num_bids}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuctionTable;
