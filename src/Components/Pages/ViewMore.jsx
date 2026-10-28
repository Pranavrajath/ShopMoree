import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewMore = () => {
  const params = useParams();
  const prodid = params.id;

  const [product, setProduct] = useState({});
  const viewmorecall = async () => {
    const apiresid = await axios.get(
      `http://localhost:4000/products/${prodid}`,
    );
    setProduct(apiresid.data);
    toast.info("All Data");
  };
  useEffect(() => {
    viewmorecall();
  }, []);

  let { id, title, price, image, rating, category, description } = product;

  const navi = useNavigate();
  const location = useLocation();
  const bool = location.pathname.startsWith("/adminportal/");
  const close = () => {
    {
      bool ? navi("/adminportal/products") : navi("/usersportal/products");
    }
  };

  const del = async (id) => {
    let bool = window.confirm("Do you want to delete this product");
    if (bool) {
      await axios.delete(`http://localhost:4000/products/${id}`);
      toast.error("Product Deleted");
      navi("/adminportal/products");
    } else {
      toast.warn("Product Not Deleted");
    }
  };

  return (
    <div className="viewmore">
      <div className="card">
        <div className="left">
          <div className="image">
            <img src={image} alt="" />
          </div>
        </div>
        <div className="right">
          <div className="head">
            <h4>{title}</h4>
            <div className="close" onClick={close}>
              X
            </div>
          </div>
          <p>{description}</p>
          <div className="rateandprice">
            <div className="rate">
              <h5>Rating</h5>
              <h6>{rating?.rate}</h6>
            </div>
            <div className="price">Rs. {Math.round(price * 90)}.00</div>
          </div>
          <div className="btn">
            {bool 
              ? <button onClick={() => del(id)}>Delete</button>
              : <button >Add To Cart</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMore;
