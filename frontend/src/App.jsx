import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Subscriptions from "./subscriptions/Subscriptions"
import ContactsUs from "./contactsUs/ContactsUs"
import Signup from "./components/Signup";

import Abouts from "./abouts/Abouts";
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
         <Route path="/contact" element={<ContactsUs />} />
         <Route path="/about" element={<Abouts />} />
         <Route path="/subscription" element={< Subscriptions/>} />
      </Routes>
      <Toaster />
      </div>
      </>
  );
}

export default App;
