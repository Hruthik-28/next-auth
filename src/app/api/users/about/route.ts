import connectToDb from "@/dbConnect/dbConnect";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "User details fetched successfully", data: user },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
