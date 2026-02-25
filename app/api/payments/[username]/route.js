import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Payment from "@/models/payment";

export async function GET(request, { params }) {
    try {
        const { username } = await params;

        // Connect to database
        await connectDB();

        // Fetch successful payments for the specified user
        const payments = await Payment.find({ to_user: username, status: "success" })
            .sort({ createdAt: -1 }) // Show latest first
            .lean();

        return NextResponse.json({
            success: true,
            payments,
        });
    } catch (error) {
        console.error("Fetch Payments Error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
