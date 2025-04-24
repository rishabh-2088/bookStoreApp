import React from "react";
import Home from "./home/Home";
import { Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/About";
function App() {
  return (
    <>
    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home/>}/>
         <Route path="/Course" element={<Courses/>}/>
         <Route path="/signup" element={<Signup/>}/>
         <Route path="/contact" element={<ContactUs />} />
         <Route path="/about" element={<AboutUs />} />
      </Routes>
      </div>
      </>
  );
}

export default App;
