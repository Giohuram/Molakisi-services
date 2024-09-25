import mongoose from "mongoose";
import Tutor from '../models/TutorSchema.js'; // Import the Tutor model

const reviewSchema = new mongoose.Schema(
  {
    tutor: {
      type: mongoose.Types.ObjectId,
      ref: "Tutor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user', 
    select: "name photo", 
  });

  next(); 
});

reviewSchema.statics.calcAverageRatings = async function(tutorId) {
  // this points the current review
  const stats = await this.aggregate([
    { $match: { tutor: tutorId }},
    {
      $group: {
        _id: '$tutor',
        numOfRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      }
    }
  ]);

  // Ensure stats are available before updating
  if (stats.length > 0) {
    await Tutor.findByIdAndUpdate(tutorId, {
      totalRating: stats[0].numOfRating, 
      averageRating: stats[0].avgRating, 
    });
  } else {
    // If no reviews, set default ratings
    await Tutor.findByIdAndUpdate(tutorId, {
      totalRating: 0,
      averageRating: 0,
    });
  }
};

reviewSchema.post('save', function() {
  // After saving a review, recalculate the tutor's average ratings
  this.constructor.calcAverageRatings(this.tutor);
});

export default mongoose.model("Review", reviewSchema);
