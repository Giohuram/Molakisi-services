import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    userId: {
      type: String,
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed, // JSON type
      default: null,
    },
    validated: {
      type: Boolean,
      default: false,
    },
    validatedAt: {
      type: Date,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    method: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    subscriptionId: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
