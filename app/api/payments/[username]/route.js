import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Payment from "@/models/payment";

export async function GET(request, { params }) {
    try {
        const { username } = await params;


        await connectDB();


        const payments = await Payment.find({ to_user: username, status: "success" })
            .sort({ createdAt: -1 })
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
