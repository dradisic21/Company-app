import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    if (req.method !== "DELETE") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { employeeNo } = req.body;

    if (!employeeNo) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const querySql = "DELETE FROM Employee WHERE employeeNo = ?";

    const valueParams = [employeeNo];

    const result = await query({ query: querySql, values: valueParams });

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ success: true, message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ success: false, error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
