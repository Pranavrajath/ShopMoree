import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
    const navigate = useNavigate()
  const [newProd, setNewProd] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  });
  let allcategory = [
    "---Select Catogory---",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

  const handleInput = (e) => {
    let key = e.target.name;
    let val = e.target.value;
    if (key === "rate" || key === "count") {
      setNewProd({
        ...newProd,
        rating: {
          ...newProd.rating,
          [key]: val,
        },
      })
    } else {
      setNewProd({
        ...newProd,
        [key]: val,
      })
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault(); 
    try {
        await axios.post(`http://localhost:4000/products`, {
            ...newProd,
            price : Number(newProd.price),
            rating : {
                ...newProd.rating,
                 rate : Number(newProd.rating.rate),
                 count : Number(newProd.rating.count)
            }
        })
        navigate('/adminportal/products')
        toast.success("Product is added!")
    } catch (error) {
        toast.error(`Product is not added ${error}`)
    }
  }
  return (
    <div className="add-products">
      <div className="formbox">
        <div className="head">
            <h4>Add Product</h4>
            <button onClick={()=>navigate('/adminportal/products')}>X</button>
        </div>
        <form action="">
          <div className="inputfeild">
            <input
              type="text"
              placeholder="Enter Title"
              onChange={handleInput}
              name="title"
              value={newProd.title}
              required
            />
            <input
              type="text"
              placeholder="Enter price"
              onChange={handleInput}
              name="price"
              value={newProd.price}
              required
            />
            <input
              type="text"
              placeholder="Enter Description"
              onChange={handleInput}
              name="description"
              value={newProd.description}
              required
            />
            <select 
            name="category"
            onChange={handleInput}
            required
            >
              {allcategory.map((ele, i) => {
                return (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              placeholder="Enter image url"
              onChange={handleInput}
              name="image"
              value={newProd.image}
              required
            />
            <input
              type="text"
              placeholder="Enter Rating"
              onChange={handleInput}
              name="rate"
              value={newProd.rating.rate}
              required
            />
            <input
              type="text"
              placeholder="Enter Count"
              onChange={handleInput}
              name="count"
              value={newProd.rating.count}
              required
            />
          </div>
          <div className="butn">
            <button onClick={handleSubmit}>Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
