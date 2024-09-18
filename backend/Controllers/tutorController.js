import Tutor from '../models/TutorSchema.js';

export const updateTutor = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await Tutor.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: 'Mise à jour fait avec succès',
            data: updateTutor,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Échec de mise à jour' });
    }
};


export const deleteTutor = async (req, res) => {
    const id = req.params.id;

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
        const Tutor = await Tutor.findById(id).populate("reviews").select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({
            success: true,
            message: 'Utilisateur trouvé',
            data: Tutor,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
};


export const getAllTutor = async (req, res) => {
    try {

        const {query} = req.query
        let tutors;
        
        if(query){
            tutors = await Tutor.find({isApproved:'approved', $or:[{name:{$regex: query, $options: "i"}}, { specialization: { $regex: query, $options: "i"}}], }).select("-password"); 
        } else {
            tutors = await Tutor.find({ isApproved: "approved"}).select("-password")
        }
        res.status(200).json({
            success: true,
            message: 'Utilisateurs trouvés',
            data: tutors,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
};
