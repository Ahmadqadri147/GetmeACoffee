/**
 * Real Payment Strategy (Placeholder)
 *
 * This is a placeholder for real payment gateway integration.
 * Implement this module when integrating Razorpay, Stripe, Cashfree, or Instamojo.
 *
 * Expected interface:
 *   initiatePayment({ name, to_user, message, amount })
 *     → { success, order_id, transaction_id, status, gateway, redirect_url? }
 */

export async function initiatePayment(/* { name, to_user, message, amount } */) {
    throw new Error(
        "Real payment gateway is not configured. " +
        "Please integrate Razorpay, Stripe, Cashfree, or Instamojo and update this strategy."
    );
}
