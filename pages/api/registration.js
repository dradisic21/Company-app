import bcrypt from "bcrypt";
import { query } from "../../lib/db";

export async function insertUser(username, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const results = await query({
      query: "INSERT INTO login (loginUserName, loginPassword) VALUES (?, ?)",
      values: [username, hashedPassword],
    });

    return results.insertId;
  } catch (error) {
    throw new Error(`User input error: ${error.message}`);
  }
}

export async function registerUser(username, password) {
  try {
    const existingUsers = await query({
      query: "SELECT * FROM login WHERE loginUserName = ?",
      values: [username],
    });

    if (existingUsers.length > 0) {
      throw new Error("Username already taken.");
    }
    const userId = await insertUser(username, password);

    return userId;
  } catch (error) {
    throw new Error(`Registration error: ${error.message}`);
  }
}
