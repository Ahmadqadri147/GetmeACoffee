/**
 * Payment Service — Strategy Pattern Router
 *
 * Reads PAYMENT_MODE from environment and delegates to the
 * corresponding payment strategy. Add new strategies by
 * creating a file in lib/strategies/ and registering it here.
 *
 * Supported modes: "fake" | "real"
 */

import * as fakeStrategy from "./strategies/fakePaymentStrategy";
import * as realStrategy from "./strategies/realPaymentStrategy";

const strategies = {
    fake: fakeStrategy,
    real: realStrategy,
    // Add future strategies here:
    // razorpay: razorpayStrategy,
    // stripe: stripeStrategy,
    // cashfree: cashfreeStrategy,
};

function getStrategy() {
    const mode = (process.env.PAYMENT_MODE || "fake").toLowerCase();
    const strategy = strategies[mode];

    if (!strategy) {
        throw new Error(
            `Unknown PAYMENT_MODE "${mode}". Supported modes: ${Object.keys(strategies).join(", ")}`
        );
    }

    return strategy;
}

/**
 * Initiate a payment using the configured strategy.
 * @param {{ name: string, to_user: string, message: string, amount: number }} params
 * @returns {Promise<{ success: boolean, order_id: string, transaction_id: string, status: string, gateway: string }>}
 */
export async function initiatePayment(params) {
    const strategy = getStrategy();
    return strategy.initiatePayment(params);
}
