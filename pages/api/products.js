import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const select = "SELECT productid, productname, productimage FROM products";
    const values = [];
    const data = await query({ query: select, values: [values] });
    console.log("Data: " + data);
    res.status(200).json({ products: data });
  } catch (error) {
    // unhide to check error
    res.status(500).json({ error: error.message });
  }
}