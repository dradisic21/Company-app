// pages/api/updateData.js
import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { employeeNo, updatedData } = req.body;

    if (!employeeNo || !updatedData) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const querySql = "UPDATE Employee SET employeeName = ?, salary = ?, departmentNo = ? WHERE employeeNo = ?";
    const valueParams = [updatedData.employeeName, updatedData.salary, updatedData.departmentNo, employeeNo];
    const result = await query({ query: querySql, values: valueParams });

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: 'Employee updated successfully' });
    } else {
      res.status(404).json({ success: false, error: 'Employee not found' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
