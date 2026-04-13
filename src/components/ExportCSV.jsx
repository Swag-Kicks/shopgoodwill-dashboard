import React from "react";

const ExportCSV = ({ data, buttonClass }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSend = async () => {
    if (!email) return alert("Enter email");

    await fetch("https://erp.thriftops.com/techWork/api/export_report.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, data }),
    });

    alert("Report sent to email");
    setShowModal(false);
    setEmail("");
  };

  return (
    <>
      {/* BUTTON */}
      <span
        onClick={() => setShowModal(true)}
        className={
          buttonClass ||
          "px-4 py-2 bg-slate-800 text-white rounded cursor-pointer"
        }
      >
        Export
      </span>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-bold mb-4">Export Report</h2>

            <p className="text-sm text-slate-500 mb-3">
              Enter email to receive report
            </p>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded-lg mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSend}
                className="px-4 py-2 text-sm bg-slate-800 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExportCSV;
