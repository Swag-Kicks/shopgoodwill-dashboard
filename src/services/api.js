// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://erp.thriftops.com/techWork/api",
// });

// export const fetchAuctions = async () => {
//   try {
//     const response = await API.get("/get_shopgoodwill_closed_auction.php");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching auctions:", error);
//     return []; // fallback to empty
//   }
// };
import axios from "axios";

const API = axios.create({
  baseURL: "https://erp.thriftops.com/techWork/api",
});

export const fetchAuctions = async (category = "all", page = 1) => {
  try {
    const response = await API.get(
      `/get_shopgoodwill_data_details.php?category=${category}&page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching auctions:", error);
    return null;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await API.get(`/get_shopgoodwill_cat_details.php`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
