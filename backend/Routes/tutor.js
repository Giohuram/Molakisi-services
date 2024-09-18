import express from 'express';
import { updateTutor, deleteTutor, getSingleTutor, getAllTutor }from "../Controllers/tutorController.js";

import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router()

router.get('/:id', getSingleTutor)
router.get('/', getAllTutor)
router.put('/:id', authenticate, restrict(["tutor"]),  updateTutor)
router.delete('/:id', authenticate, restrict(["tutor"]),  deleteTutor)

export default router; 