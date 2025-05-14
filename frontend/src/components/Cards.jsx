import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function Cards({ item }) {
  // Function to load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handler for the 'Buy Now' button click
  const handleBuyNow = async () => {
    if (!item?.price || item.price === 0) {
      toast.success("🎉 Book purchased successfully!");
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("❌ Razorpay SDK failed to load.");
      return;
    }

    try {
      // Step 1: Create order from backend
      const { data: order } = await axios.post("http://localhost:4001/api/payment/create-order", {
        amount: Math.round(item.price * 100), // Convert INR to paisa
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_RVIhrMAe9UQOHN",
        amount: order.amount,
        currency: order.currency,
        name: "BookStore",
        description: item.title || "Book purchase",
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Step 2: Verify payment on backend
            await axios.post("http://localhost:4001/api/payment/verify-payment", {
              razorpay_order_id: order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success("✅ Payment verified successfully!");
          } catch (error) {
            console.error("Verification failed:", error);
            toast.error("❌ Payment verification failed");
          }
        },
        prefill: {
          name: "User Name", // Replace with actual data
          email: "user@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error.response?.data || error.message);
      toast.error("❌ Payment failed. Please try again.");
    }
  };

  return (
    <div className="mt-4 my-3 p-3">
      <div className="card bg-base-100 w-92 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img src={item.image || "/placeholder.png"} alt={item.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">
              ₹{Number(item.price).toFixed(2)}
            </div>
            <div
              onClick={handleBuyNow}
              className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-blue-500 hover:text-white duration-200"
            >
              {item.price === 0 ? "Free" : "Buy Now"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
