import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios"
import {Link} from "react-router-dom"
function Course() {
  const [book,setBook]=useState([])
  useEffect(() =>{
    const getBook=async()=>{
      try {
        const res = await axios.get("https://bookstoreapp-yhvs.onrender.com/course");
        console.log(res.data)
        setBook(res.data)
      } catch (error) {
        console.log(error)
      }
    };
    getBook();
  }, []);
  return  (
  <>
  <div className="max-w-screen-2x1 container mx-auto md:px-20 px-4 ">
    <div className="mt-28 items-center justify-center text-center ">
      <h1 className="text-2xl  md:text-4xl">
        We are delighted to have you 
        <span className="text-blue-500">Here!! :)</span>
        </h1>
        <p className="mt-12">
        Learn at Your Own Pace
Discover Free Courses Across Every Genre
Grow Your Knowledge, One Chapter at a Time
        </p>
        <Link to="/">
        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800 duration-300">
          Back
          </button>
          </Link>
    </div>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
      {book.map((item)=>(
          <Cards key={item.id} item={item}/>
        ))
      }
    </div>
  </div>
  </>
  );
}

export default Course;