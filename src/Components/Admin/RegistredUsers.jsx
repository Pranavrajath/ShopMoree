import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';

const RegistredUsers = () => {
  const [users, setUsers] = useState([]);
  const fetchapi = async () => {
    let data = await axios.get("http://localhost:4000/UserDetails");
    setUsers(data.data);
  };

  useEffect(() => {
    fetchapi();
  }, []);

  const handleDel = async(id) =>{
    try {
       let bool = confirm('Do you want to delete the details')
       if(bool){
        await axios.delete(`http://localhost:4000/UserDetails/${id}`)
        toast.success('User Deleted')
        setTimeout(()=>{
            window.location.reload()
        },1500)
       }
       else{
        toast.error('User Not Deleted')
       }
    } catch (error) {
        
    }
    
  }
  return (
    <div className="registereduser">
      <h2>Registred Users</h2>
      <table>
        <thead>
          <tr>
            <th>Si.no</th>
            <th>Username</th>
            <th>Conntact</th>
            <th>Email</th>
            <th>Password</th>
            <th>age</th>
            <th>Address</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((ele, index) => {
            let { id,username, contact, email, password, dob, place } = ele;
            let age = new Date().getFullYear() - dob.slice(0, 4);
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{username}</td>
                <td>{contact}</td>
                <td>{email}</td>
                <td title={password}>********</td>
                <td>{age}</td>
                <td>{place}</td>
                <td><button onClick={()=>handleDel(id)}><DeleteIcon/></button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RegistredUsers;
