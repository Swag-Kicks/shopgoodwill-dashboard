import React from "react";

const AuctionTable = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold">Recent Auctions</h3>
        {/* <button className="text-sm text-indigo-600 font-medium">
          View All
        </button> */}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Item Title</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Bids</th>
              {/* <th className="px-6 py-4 font-semibold">Status</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4 text-slate-500">
                  {item.category_name}
                </td>
                <td className="px-6 py-4 text-emerald-600 font-semibold">
                  ${Number(item.current_price).toFixed(2)}
                </td>
                <td className="px-6 py-4">{item.num_bids}</td>
                {/* <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.num_bids === 0
                        ? "bg-slate-100 text-slate-500"
                        : item.num_bids < 5
                          ? "bg-amber-50 text-amber-600"
                          : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {item.num_bids === 0
                      ? "Closed"
                      : item.num_bids < 5
                        ? "Ending Soon"
                        : "Active"}
                  </span>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuctionTable;
