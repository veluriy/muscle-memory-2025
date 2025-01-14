import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest): NextResponse {
	// GET /api/users リクエストの処理
	return NextResponse.json(
		{ response: "sample" },
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
