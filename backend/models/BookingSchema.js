// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     tutor: {
//       type: mongoose.Types.ObjectId,
//       ref: "Tutor",
//       required: true,
//     },
//     user: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     ticketPrice: { 
//       type: Number, // Use a numeric type for the price
//       required: true 
//     },
//     status: {
//       type: String,
//       enum: ["pending", "approved", "cancelled"],
//       default: "pending",
//     },
//     isPaid: {
//       type: Boolean,
//       default: false, // Default is unpaid
//     },
//     // session: {
//     //   type: String, // Session ID from Flexpay
//     // },
//     // paymentMethod: {
//     //   type: String,
//     //   enum: ["card", "mobile", "mobile_money"], // Include mobile_money here
//     //   required: true,
//     // },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "completed", "failed"], // Payment status
//       default: "pending",
//     },
//     transactionId: {
//       type: String, // Transaction ID from Flexpay
//     },
//   },
//   { timestamps: true }
// );

// // Pre-hook to populate fields before executing a find query
// bookingSchema.pre(/^find/, function (next) {
//   this.populate("user").populate({
//     path: "tutor",
//     select: "name", 
//   });

//   next();
// });

// export default mongoose.model("Booking", bookingSchema);

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tutor: {
      type: mongoose.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { 
      type: Number,
      required: true 
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    // paymentStatus: {
    //   type: String,
    //   enum: ["pending", "completed", "failed"],
    //   default: "pending",
    // },
    // transactionId: {
    //   type: mongoose.Types.ObjectId, // Change to ObjectId for transaction reference
    //   ref: "Transaction", // Reference to the Transaction model
    // },
  },
  { timestamps: true }
);

// Pre-hook to populate fields before executing a find query
bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate("tutor");
  next();
});

export default mongoose.model("Booking", bookingSchema);
