import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserRegistrationForm from '../Admin/UserRegistrationForm'
import { useNavigate } from "react-router-dom";

const UsersLogin = () => {
  const navigate = useNavigate()
  let [userdata,setuserdata] =useState([])
  let fetchapi = async () =>{
    try {
      let resp = await axios.get(`http://localhost:4000/UserDetails`)
      setuserdata(resp.data)
    } catch (error) {
      toast.error(`failed to fetch : ${error}`)
    }
  }
  useEffect(()=>{
    fetchapi()
  },[])

  // todo : collect all email address from the users api
  let allusersemail = userdata.map(elem=>elem.email)
  
let [formData,setformData] = useState({emailfield : "",passwordfield:""})

  let handleInput =(e)=>{
    let key  = e.target.name
    let val = e.target.value
    
    setformData({
      ...formData,
      [key] : val
    })
   }

   let handleSubmit = (e) =>{
    e.preventDefault()
    let {emailfield,passwordfield} = formData
    
    const errborder = "border: 2px solid red; color: red;";
    let emailIndex = allusersemail.indexOf(emailfield)
    
    if(emailIndex !== -1){
      let userpassword = userdata[emailIndex].password
            
      if(userpassword === passwordfield){
        toast.success('welcome')
        navigate('/usersportal/')

      }else{
        toast.error('wrong password')
        e.target[0].style.cssText = "";
        e.target[1].style.cssText = errborder
      }
    }
    else{
      toast.error("Invalid Email")
      e.target[1].style.cssText = "";
      e.target[0].style.cssText = errborder;
    }
   }
  return (
    <>
      <div className="users-login">
        <form onSubmit={handleSubmit}>
          <input
           type="email" 
           placeholder="Enter Email Address" 
           onChange={handleInput}
           name='emailfield'
           value={formData.emailfield}
           required
           />
          <input 
          type="password" 
          placeholder="Enter Password"
          name='passwordfield'
          onChange={handleInput}
          value={formData.passwordfield}
          required
           />

          <button>Users Login</button>
        </form>
        <button onClick={()=>navigate('/adminportal/register')}>Register</button>
      </div>
    </>
  );
};

export default UsersLogin;