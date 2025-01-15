import { NextResponse } from "next/server";
import pool from "../../../../lib/db";

export async function GET() {
	try {
		const queryText = `
      SELECT workout.id AS workout_id, workout.date, workout.memo, workout.createdBy,
             record.id AS record_id, record.tid, record.weight, record.reps, record.sets, record.comment,
             type.name AS type_name, type.part AS type_part
      FROM workout
      LEFT JOIN record ON workout.id = record.wid
      LEFT JOIN type ON record.tid = type.id
    `;
		const { rows } = await pool.query(queryText);
		return NextResponse.json(rows);
	} catch (error) {
		console.error("Database query error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
