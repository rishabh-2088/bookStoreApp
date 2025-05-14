import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "express";
import cors from "cors";
import Razorpay from "razorpay";
import crypto from "crypto"; // Needed for signature verification

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import paymentRoute from "./route/payment.js"

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// MongoDB Connection
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/api/payment", paymentRoute); // Use the payment route here


// ✅ Route: Create Razorpay Order (One-time payment)
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // ₹ to paisa
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// ✅ Route: Verify Razorpay Order Payment
app.post("/api/payment/verify-payment", async (req, res) => {
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
      return res.status(400).json({ message: "Invalid signature, verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Server error during payment verification" });
  }
});

// ✅ Route: Create Razorpay Subscription
app.post("/api/payment/create-subscription", async (req, res) => {
  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: "plan_QPykqiNQsQL9uK", // ⬅️ Replace with your actual plan ID from Razorpay Dashboard
      customer_notify: 1,
      total_count: 12,
    });

    res.status(200).json(subscription);
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ message: "Failed to create subscription" });
  }
});

// ✅ Route: Verify Razorpay Subscription Payment
app.post("/api/payment/verify-subscription", async (req, res) => {
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
      return res.status(400).json({ message: "Invalid signature, verification failed" });
    }
  } catch (error) {
    console.error("Error verifying subscription:", error);
    res.status(500).json({ message: "Server error during subscription verification" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
