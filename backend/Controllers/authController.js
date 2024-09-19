import User from '../models/UserSchema.js';
import Tutor from '../models/TutorSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d',
    });
};

// Register User
export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;

    try {
        let user = null;

        if (role === 'student') {
            user = await User.findOne({ email });
        } else if (role === 'tutor') {
            user = await Tutor.findOne({ email });
        }

        // Check if user exists
        if (user) {
            return res.status(400).json({ message: 'Utilisateur existe déjà' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user based on role
        if (role === 'student') {
            user = new User({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role,
            });
        } else if (role === 'tutor') {
            user = new Tutor({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role,
            });
        }

        // Save user to the database
        await user.save();
        res.status(200).json({ success: true, message: 'Utilisateur créé avec succès' });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Internal server error, Try again later' });
    }
};

// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = null;

        const student = await User.findOne({ email });
        const tutor = await Tutor.findOne({ email });

        if (student) {
            user = student;
        }
        if (tutor) {
            user = tutor;
        }

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas" });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Exclude sensitive data
        const { password: _, role, appointment, ...rest } = user._doc;

        return res.status(200).json({ status: true, message: 'Connecté avec succès', token, data: { ...rest }, role });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ status: false, message: 'Echec de connexion' });
    }
};
