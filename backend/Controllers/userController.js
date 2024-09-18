import User from '../models/UserSchema.js';

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
