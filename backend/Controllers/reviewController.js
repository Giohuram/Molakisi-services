import Review from '../models/ReviewSchema.js'
import Tutor from '../models/TutorSchema.js'

// get all reviews 

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})
        res.status(200).json({success:true, message:'successful', data: reviews}); 
    } catch (error) {
        res.status(404).json({success: false, message: "not found"}); 
    }
}; 

// create review 
export const createReview = async (req, res) => {
  if (!req.body.tutor) req.body.tutor = req.params.tutorId;
  if (!req.body.user) req.body.user = req.userId;

  // Validate rating
  if (!req.body.rating || req.body.rating < 1 || req.body.rating > 5) {
    return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
  }

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();
    
    // Log the saved review
    console.log("Saved Review:", savedReview); // This should be here inside the try block

    // Push the review ID to the tutor's reviews array
    await Tutor.findByIdAndUpdate(req.body.tutor, {
      $push: { reviews: savedReview._id }
    });

    // Recalculate average ratings for the tutor
    await Review.calcAverageRatings(req.body.tutor);

    res.status(200).json({ success: true, message: 'Review submitted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
