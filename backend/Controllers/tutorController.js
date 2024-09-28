import Tutor from '../models/TutorSchema.js';
import Booking from '../models/BookingSchema.js';


// Update a tutor
export const updateTutor = async (req, res) => {
    const id = req.params.id;

    try {
        const tutor = await Tutor.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: 'Mise à jour fait avec succès',
            data: tutor, // returning updated tutor data
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Échec de mise à jour' });
    }
};

// Delete Tutor 
export const deleteTutor = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Invalid tutor ID",
        });
    }

    try {
        await Tutor.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Effacé avec succès',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Échec de suppression' });
    }
};


export const getSingleTutor = async (req, res) => {
    const id = req.params.id;

    try {
        const tutor = await Tutor.findById(id).populate("reviews").select("-password");
        if (!tutor) {
            return res.status(404).json({ success: false, message: 'Tutor not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Tutor found',
            data: tutor,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
};

// Get all tutors or filter by query
export const getAllTutor = async (req, res) => {
    try {
        const { query } = req.query;
        let tutors;

        if (query) {
            tutors = await Tutor.find({
                isApproved: 'approved',
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } }
                ],
            }).select("-password");
        } else {
            tutors = await Tutor.find({ isApproved: "approved" }).select("-password");
        }

        res.status(200).json({
            success: true,
            message: 'Tutors found',
            data: tutors,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
};

// Get tutor profile
export const getTutorProfile = async (req, res) => {
    const tutorId = req.userId;

    try {
        const tutor = await Tutor.findById(tutorId).select('-password');
        if (!tutor) {
            return res.status(404).json({ success: false, message: 'Tutor not found' });
        }

        const appointments = await Booking.find({ tutor: tutorId });

        res.status(200).json({
            success: true,
            message: 'Profile info retrieved',
            data: { ...tutor._doc, appointments }, // combining profile and appointments data
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
};

