import express from 'express';
import { updateUser, deleteUser, getAllUser, getSingleUser, getUserProfile, getMyAppointment } from "../Controllers/userController.js";
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

// Route to get single user by ID
router.get('/:id', authenticate, restrict(["student"]), getSingleUser);

// Route to get all users (restricted to admin)
router.get('/', authenticate, restrict(["admin"]), getAllUser);

// Route to update user by ID
router.put('/:id', authenticate, restrict(["student"]), updateUser);

// Route to delete user by ID
router.delete('/:id', authenticate, restrict(["student"]), deleteUser);

// Route to get the current user's profile
router.get('/profile/me', authenticate, restrict(["student"]), getUserProfile);

// Route to get the current user's appointments
router.get('/appointments/my-appointments', authenticate, restrict(["student"]), getMyAppointment);

export default router;
