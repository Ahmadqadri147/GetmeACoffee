import mongoose from "mongoose";
import { updateTag } from "next/cache";
const { Schema, model } = mongoose;
const paymentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    to_user: {
        type: String,
        required: true,
    },
    order_id: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    done: {
        type: Boolean,
        default: false,
    },
});
const Payment = mongoose.models.Payment || model("Payment", paymentSchema);
export default Payment;