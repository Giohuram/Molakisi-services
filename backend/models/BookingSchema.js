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
  },
  { timestamps: true }
);

// Pre-hook to populate fields before executing a find query
bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate("tutor");
  next();
});

export default mongoose.model("Booking", bookingSchema);
