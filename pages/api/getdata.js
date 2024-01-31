import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const querySql = "SELECT employeeNo, employeeName, salary, departmentNo, lastModifyDate FROM Employee";

    const valueParams = [];
    const data = await query({ query: querySql, values: [valueParams] });
    console.log("Data: " + data);

    res.status(200).json({ Employee: data });
  } catch (error) {
    // unhide to check error
    res.status(500).json({ error: error.message });
  }
}
