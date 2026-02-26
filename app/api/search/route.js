import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q");

        if (!query) {
            return NextResponse.json({ success: true, users: [] });
        }

        // Search for users whose username starts with the query
        // Case-insensitive search
        const users = await User.find({
            username: { $regex: `^${query}`, $options: "i" }
        })
        .select("username name profilepic")
        .limit(10);

        return NextResponse.json({ success: true, users });
    } catch (error) {
        console.error("GET /api/search error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
