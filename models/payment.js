import mongoose from "mongoose";
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
  transaction_id: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.models.Payment || model("Payment", paymentSchema);
export default Payment;