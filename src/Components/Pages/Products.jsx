import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Products = () => {
  const[products , setProducts] = useState([])
  

  const fetchApi = async () =>{
    let apiRes = await axios.get('http://localhost:4000/products')
    setProducts(apiRes.data)
  }
  useEffect(()=>{
    fetchApi()
  },[])
  const navigate = useNavigate()
  const viewMore = (prodid) =>{
    navigate(`/adminportal/viewmore/${prodid}`)
  }
  return (
    <div className='products'>
      {products.map((data, i)=>{
        let {id,title,price,image,category,rating} = data
        let {rate,count} = rating
        return(
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
              <div className="price">
                Rs. {Math.round(price *90)}.00 
              </div>
            </div>
            <button onClick={()=>viewMore(id)}>View More</button>
          </div>
        )
      })}
    </div>
  )
}

export default Products