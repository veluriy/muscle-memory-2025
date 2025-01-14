import { Dbquery } from "@/app/conf/db";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
	// GET /api/users リクエストの処理
	const reqBody = await request.json();

	return NextResponse.json(
		{ response: "Test response." },
		{
			status: 200, // ステータスコード
			headers: {
				// レスポンスヘッダー
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods":
					"GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		}
	);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
	// POST /api/users リクエストの処理
	const reqBody = await request.json();
	const name = reqBody.uname;
	// dbでなんかする許せん

	/**
     * .json(
					Dbquery(
						"insert into users (id, name) values ('" +
							randomUUID() +
							"', '" +
							name +
							"';"
					)
				);
     */

	const res = await Dbquery(
		"insert into users (id, name) values ('" +
			Math.floor(Math.random() * (65535 + 1)) +
			"', '" +
			name +
			"');"
	);

	return NextResponse.json(
		{ response: res },
		{
			status: 200, // ステータスコード
			headers: {
				// レスポンスヘッダー
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods":
					"GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		}
	);
}
