import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function Subs() {
  const [subscribed, setSubscribed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("Users");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSubscribe = async () => {
    if (!user) {
      toast.error("Please log in to subscribe.");
      return;
    }

    try {
      // Step 1: Create subscription from backend
      const { data: subscription } = await axios.post("http://localhost:4001/api/payment/create-subscription");

      const options = {
        key: "rzp_test_RVIhrMAe9UQOHN", // Replace with LIVE key in production
        subscription_id: subscription.id,
        name: "BookNest Membership",
        description: "30-Day Recurring Premium Membership",
        handler: async function (response) {
          try {
            // Step 2: Verify payment
            const { data: verifyRes } = await axios.post("http://localhost:4001/api/payment/verify-subscription", {
              razorpay_subscription_id: subscription.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.message === "Subscription verified successfully") {
              toast.success("Subscription Activated!");

              const updatedUser = {
                ...user,
                membership: "Active",
                subscriptionId: subscription.id,
              };

              localStorage.setItem("Users", JSON.stringify(updatedUser));
              setSubscribed(true);

              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              toast.error("Subscription verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Error verifying subscription.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.contact || "9999999999",
        },
        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Subscription creation error:", error);
      toast.error("Failed to initiate subscription.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">Subscribe Now</h2>
        <p className="text-center text-gray-700 mb-6">
          Get <strong>30-day</strong> premium access for just <strong>₹499/month</strong>!
        </p>
        <button
          onClick={handleSubscribe}
          disabled={subscribed}
          className={`w-full py-3 text-white font-semibold rounded transition duration-300 ${
            subscribed ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {subscribed ? "Subscribed!" : "Start Subscription"}
        </button>
      </div>
    </div>
  );
}

export default Subs;
