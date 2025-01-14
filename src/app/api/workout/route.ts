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
