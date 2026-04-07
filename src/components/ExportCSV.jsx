import React from "react";
import { CSVLink } from "react-csv";

const ExportCSV = ({ data, buttonClass }) => (
  <CSVLink
    data={data}
    filename="auctions.csv"
    className={
      buttonClass ||
      "px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    }
  >
    Export CSV
  </CSVLink>
);

export default ExportCSV;
