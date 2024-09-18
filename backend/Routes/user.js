import express from 'express';
import { updateUser, deleteUser, getAllUser, getSingleUser } from "../Controllers/userController.js";

import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router()

router.get('/:id', authenticate, restrict(["student"]),  getSingleUser)
router.get('/', authenticate, restrict(["admin"]), getAllUser)
router.put('/:id', authenticate, restrict(["student"]), updateUser)
router.delete('/:id', authenticate, restrict(["student"]), deleteUser)

export default router; 