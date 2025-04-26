import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/About";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser ] = useAuth();
  console.log(authUser);
  return (
    <>
    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home/>}/>
         <Route path="/Course" element={authUser ? <Courses/> : <Navigate to="/signup" />}
         />
         <Route path="/signup" element={<Signup/>}/>
         <Route path="/contact" element={<ContactUs />} />
         <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Toaster />
      </div>
      </>
  );
}

export default App;
