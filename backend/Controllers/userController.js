import User from '../models/UserSchema.js';
import Booking from '../models/BookingSchema.js';
import Tutor from '../models/TutorSchema.js';

// Update user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: 'Mise à jour faite avec succès',
            data: user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Échec de mise à jour' });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Effacé avec succès',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Échec de suppression' });
    }
};

// Get single user by ID
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({
            success: true,
            message: 'Utilisateur trouvé',
            data: user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
};

// Get all users
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({
            success: true,
            message: 'Utilisateurs trouvés',
            data: users,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    const userId = req.userId; // Extracted from auth middleware
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
        const { password, ...rest } = user._doc;
        res.status(200).json({
            success: true,
            message: 'Profile récupéré avec succès',
            data: { ...rest },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
};

// Get user's appointments
export const getMyAppointment = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.userId });
        const tutorIds = bookings.map(booking => booking.tutor);
        const tutors = await Tutor.find({ _id: { $in: tutorIds } }).select('-password');
        res.status(200).json({ success: true, message: 'Rendez-vous récupérés', data: tutors });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
};
