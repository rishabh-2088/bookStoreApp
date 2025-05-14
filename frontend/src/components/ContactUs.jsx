import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // if using React Router

function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate(); // used to navigate back

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    reset();
    alert("Thank you for contacting us!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="relative w-full max-w-lg bg-white p-8 rounded shadow-md">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)} // goes back to previous page
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border px-4 py-2 rounded outline-none"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border px-4 py-2 rounded outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full border px-4 py-2 rounded outline-none resize-none"
              {...register("message", { required: "Message is required" })}
            ></textarea>
            {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
