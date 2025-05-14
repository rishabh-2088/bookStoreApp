import express from "express";
import razorpay from "../razorpay.js"; // ✅ Reuse Razorpay instance
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

//
// -------- One-Time Payment Routes --------
//

// ✅ Create Razorpay Order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount, // Amount should be in paise already
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// ✅ Verify One-Time Payment
router.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
});

//
// -------- Subscription Routes --------
//

// ✅ Create Subscription
router.post("/create-subscription", async (req, res) => {
  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: "plan_QPykqiNQsQL9uK", // Replace with actual Razorpay Plan ID
      total_count: 12,
      customer_notify: 1,
    });

    res.status(200).json(subscription);
  } catch (error) {
    console.error("Subscription creation error:", error);
    res.status(500).json({ error: "Failed to create subscription" });
  }
});

// ✅ Verify Subscription Payment
router.post("/verify-subscription", (req, res) => {
  try {
    const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = `${razorpay_payment_id}|${razorpay_subscription_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({ message: "Subscription verified successfully" });
    } else {
      return res.status(400).json({ error: "Invalid signature" });
    }
  } catch (error) {
    console.error("Subscription verification error:", error);
    res.status(500).json({ error: "Server error during verification" });
  }
});

export default router;
