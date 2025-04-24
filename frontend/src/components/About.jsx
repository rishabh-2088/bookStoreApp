import React from "react";

function AboutUs() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">About Our Bookstore</h1>

        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-indigo-500">BookNest</span> — your cozy corner on the web for all things books! Whether you're a passionate reader, a student looking for textbooks, or a casual browser, we've got something special for you.
        </p>

        <p className="text-gray-700 mt-4 leading-relaxed">
          BookNest was founded with a simple goal: to bring readers and stories closer together. We believe books are more than just paper — they’re journeys, ideas, and companions. That’s why we've curated a diverse collection ranging from timeless classics to the latest releases.
        </p>

        <p className="text-gray-700 mt-4 leading-relaxed">
          Our mission is to make reading accessible, enjoyable, and affordable. With a user-friendly interface, fast delivery, and personalized recommendations, we strive to give you the best online book-buying experience.
        </p>

        <p className="text-gray-700 mt-4 leading-relaxed">
          We’re more than just a store — we’re a community of book lovers. Join us for book clubs, author Q&As, and exclusive releases. 
          Want to get in touch? Visit our{" "}
          <a href="/contact" className="text-indigo-500 underline">Contact Us</a> page — we'd love to hear from you!
        </p>

        <p className="text-gray-700 mt-4 italic text-center">
          “A room without books is like a body without a soul.” – Cicero
        </p>
      </div>
    </div>
  );
}

export default AboutUs;