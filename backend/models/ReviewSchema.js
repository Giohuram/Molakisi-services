import mongoose from "mongoose";
import Tutor from './TutorSchema.js'; 

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
      min: 1,
      max: 5,
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
  const stats = await this.aggregate([
    { $match: { tutor: tutorId } },
    {
      $group: {
        _id: '$tutor',
        numOfRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      }
    }
  ]);

  console.log("Aggregation Result:", stats);  // Debugging
  
  if (stats.length > 0) {
    await Tutor.findByIdAndUpdate(tutorId, {
      totalRating: stats[0].numOfRating,
      averageRating: stats[0].avgRating,
    });
  } else {
    await Tutor.findByIdAndUpdate(tutorId, {
      totalRating: 0,
      averageRating: 0,
    });
  }
};

reviewSchema.post('save', async function() {
  // Ensure async function
  await this.constructor.calcAverageRatings(this.tutor);
});

export default mongoose.model("Review", reviewSchema);  
