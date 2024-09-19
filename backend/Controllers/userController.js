import User from '../models/UserSchema.js';
import Booking from '../models/BookingSchema.js'
import Tutor from '../models/TutorSchema.js'

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: 'Mise à jour fait avec succès',
            data: user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Échec de mise à jour' });
    }
};


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


export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select("-password");;
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

export const getUserProfile = async(req,res)=>{
    const userId = req.userId

    try {
        const user = await user.findById(userId)

        if(!user){
            return res.status(404).json({success:false, message:'user not found'})
        }
        const {password, ...rest}  = user._doc

        res.status(200).json({success:true, message: 'Profile info is getting', data:{... rest}})

    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
}

export const getMyAppointment = async(req,res)=>{
    try {
        
        // step 1: retrieve appointment from booking 
        const bookings = await Booking.find({user:req.userId})

        // step 2: extract tutor id from appointment bookings 
        const tutorIds = bookings.map(el=>el.tutor.id)

        // step 3: retrieve tutors using tutor ids 
        const tutors = await Tutor.find({_id: {$in:tutorIds}}).select('-password')

        res.status(200).json({success:true, message:'Appointment are getting', data:tutors})

    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur' });
    }
}