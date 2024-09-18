import express from 'express'
import { register, login } from '../Controllers/authController.js'

const router = express.Router()

router.post('/Signup', register)
router.post('/Login', login)

export default router; 