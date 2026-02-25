import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Payment from "@/models/payment";
import { initiatePayment } from "@/lib/paymentService";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, to_user, message, amount } = body;

        // Validate required fields
        if (!name || !to_user || !message || !amount) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: name, to_user, message, amount" },
                { status: 400 }
            );
        }

        if (typeof amount !== "number" || amount <= 0) {
            return NextResponse.json(
                { success: false, error: "Amount must be a positive number" },
                { status: 400 }
            );
        }

        // Connect to database
        await connectDB();

        // Initiate payment via the configured strategy
        const result = await initiatePayment({ name, to_user, message, amount });

        // Save payment record to database
        const payment = await Payment.create({
            name,
            to_user,
            order_id: result.order_id,
            transaction_id: result.transaction_id,
            message,
            amount,
            status: result.status,
        });

        return NextResponse.json({
            success: result.success,
            order_id: result.order_id,
            transaction_id: result.transaction_id,
            status: result.status,
            gateway: result.gateway,
            payment_id: payment._id,
        });
    } catch (error) {
        console.error("Payment API Error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
