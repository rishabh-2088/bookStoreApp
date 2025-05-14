import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true, // Optional: ensures no duplicate phone numbers
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String, // You can use Date if you want actual date operations
    required: true,
  },
  genre: {
    type: [String], // Array of strings for multiple genres
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;