import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchApi = async () => {
    let apiRes = await axios.get("http://localhost:4000/products");
    setProducts(apiRes.data);
  };
  useEffect(() => {
    fetchApi();
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const bool = location.pathname.startsWith("/adminportal");
  const viewMore = (prodid, title) => {
    {
      bool
        ? navigate(`/adminportal/viewmore/${prodid}`)
        : navigate(`/usersportal/viewmore/${prodid}`);
    }
  };

  //Category
  const [filterCategory, setFilterCategory] = useState(products);
  let allcategory = [
    "All",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];
  //  const BEstud = StudentDB.filter((student)=>{
  //       return student.course === "BE"
  //   })
  const filterCat = (e) => {
    let category = e.target.innerText;
    if (category === "All") {
      setFilterCategory(products);
    } else {
      let filterData = products.filter((ele) => {
        return ele.category === category;
      });
      setFilterCategory(filterData);
    }
  };
  useEffect(() => {
    setFilterCategory(products);
  }, [products]);

  return (
    <>
      <div className="btun">
        {bool ? (
          <button
            onClick={() => {
              navigate("/adminportal/addproduct");
            }}
          >
            Add Product
          </button>
        ) : (
          <></>
        )}
      </div>

      <div className="category">
        {allcategory.map((ele, index) => {
          return (
            <button key={index} onClick={filterCat}>
              {ele}
            </button>
          );
        })}
      </div>

      <div className="products">
        {filterCategory.map((data, i) => {
          let { id, title, price, image, category, rating } = data;
          let { rate, count } = rating;
          return (
            <div key={i} className="card">
              <h6>{category}</h6>
              <div className="image">
                <img src={image} alt="" />
              </div>
              <h2>{title}</h2>
              <div className="rateandprice">
                <div className="rate">
                  <h5>Rating</h5>
                  <h6>{rate}</h6>
                </div>
                <div className="price">Rs. {Math.round(price * 90)}.00</div>
              </div>
              <button onClick={() => viewMore(id)}>View More</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
