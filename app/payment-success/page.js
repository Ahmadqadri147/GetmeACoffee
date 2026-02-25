"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id") || "N/A";
    const txnId = searchParams.get("txn_id") || "N/A";
    const username = searchParams.get("username");

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="bg-gradient-to-br from-purple-700 to-pink-700 p-[2px] rounded-3xl shadow-2xl max-w-lg w-full">
                <div className="bg-green-950/80 backdrop-blur-xl rounded-3xl p-10 text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h1 className="text-3xl font-extrabold text-green-300 mb-2">
                        Payment Successful!
                    </h1>
                    <p className="text-green-200 mb-6">
                        Thank you for your generous support 💚
                    </p>

                    <div className="bg-green-900/60 rounded-xl p-4 mb-6 text-left space-y-2 border border-green-700">
                        <p className="text-green-100 text-sm">
                            <span className="font-semibold text-green-300">Order ID:</span>{" "}
                            {orderId}
                        </p>
                        <p className="text-green-100 text-sm">
                            <span className="font-semibold text-green-300">
                                Transaction ID:
                            </span>{" "}
                            {txnId}
                        </p>
                    </div>

                    <Link
                        href={username ? `/${username}` : "/"}
                        className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-blue-900/60 border border-blue-500 to-emerald-600 text-white font-bold tracking-wide shadow-lg hover:scale-[1.03] hover:shadow-green-500/50 transition-all duration-300"
                    >
                        {username ? `Back to ${username}'s Profile ` : "Back to Home "}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-[70vh] flex items-center justify-center text-white">
                    Loading...
                </div>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}
