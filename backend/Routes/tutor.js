import express from 'express';
import { updateTutor, deleteTutor, getSingleTutor, getAllTutor, getTutorProfile } from "../Controllers/tutorController.js";
import { authenticate, restrict } from '../auth/verifyToken.js';
import reviewRouter from './review.js';

const router = express.Router();

// Nested route for reviews
router.use("/:tutorId/reviews", reviewRouter);

// Tutor profile route (should be before the dynamic :id route)
router.get('/profile/me', authenticate, restrict(['tutor']), getTutorProfile);

// CRUD routes for tutors
router.get('/:id', getSingleTutor);
router.get('/', getAllTutor);
router.put('/:id', authenticate, restrict(["tutor"]), updateTutor);
router.delete('/:id', authenticate, restrict(["tutor"]), deleteTutor);

export default router;
