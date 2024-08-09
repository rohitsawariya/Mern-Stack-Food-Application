import React from 'react'
import { useState, useRef, useEffect } from 'react';
import './Card.css';
import { useDispatchCart, useCart } from './ContextReducer';

function Card({ foodItems, options }) {
  let dispatch = useDispatchCart();
  let priceOptions = Object.keys(options)
  let data = useCart();
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const priceRef = useRef();

  const handleAddToCart = async () => {
    let food = data.find(item => item.id === foodItems._id && item.size === size);

    if (food) {
        await dispatch({ type: "UPDATE", id: foodItems._id, price: finalPrice, qty: qty, size: size });
    } else {
        await dispatch({ type: "ADD", id: foodItems._id, name: foodItems.name, price: finalPrice, qty: qty, size: size,img: foodItems.img });
    }
}


  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (

    <div className={`card mt-2`} style={{ width: "19rem", maxHeight: "460px" }}>
      <img src={foodItems.img} style={{ height: "200px", objectFit: "fill" }} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{foodItems.name}</h5>
        <p className="card-text">{foodItems.description}</p>

        <div className='d-flex container w-100'>
          <select className='m-2 h-100 bg-secondary rounded' onChange={(e) => setQty(parseInt(e.target.value))}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              )
            })}
          </select>

          <select className='m-2 h-100 bg-secondary rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
            {priceOptions.map((data) => {
              return <option key={data} value={data}>{
                data}</option>
            })}
          </select>

          <div className='fw-semibold d-inline h-100 fs-5'>
            ₹{finalPrice}/-
          </div>
        </div>
        <hr />
        <button className='btn btn-warning justify-center ms-2 ' onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  )
}

export default Card