import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    toast.success("Data Found")
  };
  useEffect(() => {
    viewmorecall();
  }, []);

  let { id, title, price, image,rating ,category, description } = product;

  const navi = useNavigate();
  const close = () => {
    navi("/adminportal/products");
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
            <button>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMore;
