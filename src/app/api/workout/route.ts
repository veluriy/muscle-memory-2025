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

export async function POST(request: Request) {
	const { date, memo, createdBy, records, id } = await request.json();

	const client = await pool.connect();
	try {
		await client.query("BEGIN");

		const workoutResult = await client.query(
			"INSERT INTO workout (date, memo, createdBy, id) VALUES ($1, $2, $3, $4) RETURNING id",
			[date, memo, createdBy, id]
		);
		const workoutId = id;

		for (const record of records) {
			const { name, part, weight, reps, sets, comment } = record;

			let typeResult = await client.query(
				"SELECT id FROM type WHERE name = $1 AND part = $2",
				[name, part]
			);
			let typeId;
			if (typeResult.rows.length > 0) {
				typeId = typeResult.rows[0].id;
			} else {
				typeResult = await client.query(
					"INSERT INTO type (name, part, id) VALUES ($1, $2, $3) RETURNING id",
					[name, part, Math.floor(Math.random() * (65535 + 1))]
				);
				typeId = typeResult.rows[0].id;
			}

			console.log(workoutId);

			await client.query(
				"INSERT INTO record (id, tid, weight, reps, sets, comment, wid) VALUES ($1, $2, $3, $4, $5, $6, $7)",
				[
					Math.floor(Math.random() * (65535 + 1)),
					typeId,
					weight,
					reps,
					sets,
					comment,
					workoutId,
				]
			);
		}

		await client.query("COMMIT");
		return NextResponse.json({
			message: "Workout and records successfully created",
		});
	} catch (error) {
		await client.query("ROLLBACK");
		console.error("Database query error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	} finally {
		client.release();
	}
}
