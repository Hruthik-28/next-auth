import connectToDb from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "logout successfully",
            success: true,
        });

        response.cookies.set("token", "", { httpOnly: true });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
