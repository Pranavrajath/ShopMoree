import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserRegistrationForm =  () => {
  const [userData , setUserData] = useState([])
  const fetchAPI =async()=>{
    let api = await axios.get('http://localhost:4000/UserDetails')
    setUserData(api.data);
  }
  useEffect(()=>{
    fetchAPI()
  },[])
  
  let allEmail = userData.map(ele=>ele.email)
  console.log(allEmail);
  


  const [userDetails, setUserDetails] = useState({
    id: "",
    username: "",
    contact: "",
    email: "",
    password: "",
    dob: "",
    place: "",
  });

  const handleInput = (e) => {
    let key = e.target.name;
    let val = e.target.value;
    setUserDetails({
      ...userDetails,
      [key] : val
    })
    
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      await axios.post(`http://localhost:4000/UserDetails`, userDetails)
      toast.success(`User Registered`)
    } catch (error) {
      toast.error(`User is not added : ${error} `)
    }
  }
  return (
    <>
      <div className="register">
        <h1>UserRegistrationForm</h1>
        <div className="container">
          <form action="" onSubmit={handleSubmit}>
            <label>
              <span>UserName :</span>
              <input
                type="text"
                placeholder="Enter your Name"
                onChange={handleInput}
                name="username"
                value={userDetails.username}
                required
              />
            </label>
            <label>
              <span>Contact :</span>
              <input
                type="tel"
                placeholder="Enter your Phno"
                onChange={handleInput}
                name="contact"
                value={userDetails.contact}
                required
              />
            </label>
            <label>
              <span>Email :</span>
              <input
                type="email"
                placeholder="Enter your Email"
                onChange={handleInput}
                name="email"
                value={userDetails.email}
                required
              />
            </label>
            <label>
              <span>Password :</span>
              <input
                type="password"
                placeholder="Enter your Password"
                onChange={handleInput}
                name="password"
                value={userDetails.password}
                required
              />
            </label>
            <label>
              <span>Date Of Birth :</span>
              <input
                type="date"
                onChange={handleInput}
                name="dob"
                value={userDetails.dob}
                required
              />
            </label>
            <label>
              <span>Place :</span>
              <input
                type="text"
                placeholder="Enter your Address"
                onChange={handleInput}
                name="place"
                value={userDetails.place}
                required
              />
            </label>
            <div className="btn">
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegistrationForm;
