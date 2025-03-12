import express from 'express';
import { createCheckoutSession, checkPaymentStatus } from '../controllers/payment.controller.js'

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);
router.get('/check-payment-status', checkPaymentStatus);

export default router;
