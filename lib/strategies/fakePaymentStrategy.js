/**
 * Fake Payment Strategy
 * Simulates a payment gateway with a 2-second delay and 80% success rate.
 * Generates fake order and transaction IDs for testing purposes.
 */

const generateId = (prefix) => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `${prefix}_${timestamp}_${random}`;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function initiatePayment({ name, to_user, message, amount }) {
    // Simulate payment gateway processing delay
    await delay(2000);

    const order_id = generateId("FAKE_ORD");
    const transaction_id = generateId("FAKE_TXN");

    // 100% success rate for testing
    const isSuccess = true;

    return {
        success: isSuccess,
        order_id,
        transaction_id,
        status: isSuccess ? "success" : "failed",
        gateway: "fake",
    };
}
