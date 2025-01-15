import { NextResponse } from "next/server";
import pool from "../../../../lib/db";
export async function GET() {
	try {
		const { rows } = await pool.query("SELECT id, name, part FROM type");
		return NextResponse.json(rows);
	} catch (error) {
		console.error("Database query error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
