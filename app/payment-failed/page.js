"use client";

import Link from "next/link";

export default function PaymentFailedPage() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="bg-blue-600 p-[2px] rounded-3xl shadow-2xl max-w-lg w-full">
                <div className="bg-red-950/80 backdrop-blur-xl rounded-3xl p-10 text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h1 className="text-3xl font-extrabold text-red-300 mb-2">
                        Payment Failed
                    </h1>
                    <p className="text-red-200 mb-6">
                        Something went wrong with your payment. Please try again.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.history.back()}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-bold tracking-wide shadow-lg hover:scale-[1.03] hover:shadow-fuchsia-500/50 transition-all duration-300"
                        >
                            Try Again 🔄
                        </button>
                        <Link
                            href="/"
                            className="px-8 py-3 rounded-xl bg-red-900/60 border border-red-700 text-red-100 font-bold tracking-wide hover:bg-red-800/60 transition-all duration-300"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
