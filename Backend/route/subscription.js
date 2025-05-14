import express from 'express';
import razorpay from '../razorpay.js'; // Ensure the path is correct

const router = express.Router();

router.post('/create-subscription', async (req, res) => {
    try {
        const subscription = await razorpay.subscriptions.create({
            plan_id: "plan_QPykqiNQsQL9uK", // Replace with your actual Razorpay Plan ID
            customer_notify: 1,
            total_count: 12, // e.g., for a yearly subscription (1/month for 12 months)
        });

        res.json(subscription);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating subscription");
    }
});

export default router;  // Use 'export default' to export the router
