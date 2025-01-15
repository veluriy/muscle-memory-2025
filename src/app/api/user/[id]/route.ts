import { NextResponse } from "next/server";
import pool from "../../../../../lib/db";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const userId = url.pathname.split("/").pop();

	if (!userId) {
		return NextResponse.json(
			{ error: "User ID is required" },
			{ status: 400 }
		);
	}

	try {
		const res = await pool.query("SELECT name FROM users WHERE id = $1", [
			userId,
		]);
		const user = res.rows[0];

		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ name: user.name });
	} catch (error) {
		console.error("Database query error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
