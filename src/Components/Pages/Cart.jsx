import { Delete } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Cart = () => {
  const [apidata, setapidata] = useState([]);
  const fetchapi = async () => {
    let data = await axios.get(`http://localhost:4000/CartItems`);
    setapidata(data.data);
  };
  
  useEffect(() => {
    fetchapi();
  }, []);
  //delete the items
  const del = async (id, e) => {
    let bool = window.confirm("Do you want to delete this product");
    if (bool) {
      await axios.delete(`http://localhost:4000/CartItems/${id}`);
      toast.error("Product Deleted");
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } else {
      toast.warn("Product Not Deleted");
    }
  };
  let total = 0;
  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
     {apidata.length !== 0 ?
         <table>
        <thead>
          <tr>
            <th>Sino</th>
            <th>Tittle</th>
            <th>Image</th>
            <th>Category</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {apidata.map((ele, index) => {
            let { id, title, price, description, category, image } = ele;
            total += Math.round(price * 95);
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{title}</td>
                <td id="image">
                  <img src={image} alt="" />
                </td>
                <td>{category}</td>
                <td>Rs. {Math.round(price * 95)}</td>
                <td>
                  <button onClick={() => del(id)}>
                    <Delete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      :
      
      <h3 style={{fontSize:"40px",marginTop:"10vh"}}>No Products</h3> 
    }
      <h3>Total :Rs. {total}</h3>
    </div>
  );
};

export default Cart;
