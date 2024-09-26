// import express from 'express'
// import { authenticate } from './../auth/verifyToken.js'
// import { getCheckoutSession } from '../Controllers/bookingController.js'

// const router = express.Router();

// router.post("/checkout-session/:tutorId", authenticate, getCheckoutSession);

// export default router; 

import express from "express";
import { getCheckoutSession, createCheckoutSession, updateBookingPaymentStatus } from "../Controllers/bookingController.js";
import { authenticate } from "../auth/verifyToken.js";

const router = express.Router();

router.post("/api/initiate-payment/:tutorId", authenticate, getCheckoutSession, createCheckoutSession);
router.post("/api/flexpay-callback", updateBookingPaymentStatus);

export default router;
