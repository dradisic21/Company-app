import bcrypt from "bcrypt";
import { query } from "../../lib/db";

export async function loginUser(username, password) {
  try {
    const results = await query({
      query: "SELECT * FROM login WHERE loginUserName = ?",
      values: [username],
    });

    if (results.length === 0) {
      throw new Error("User not found.");
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.loginPassword);

    if (!isPasswordValid) {
      throw new Error("Wrong password.");
    }

    return user;
  } catch (error) {
    throw new Error(`Login error: ${error.message}`);
  }
}
