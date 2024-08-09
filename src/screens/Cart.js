import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { MdDelete } from "react-icons/md";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='mt-5 w-100 text-center fs-1 '>The Cart is Empty!</div>
      </div>
    )
  }

const handleCheckOut = async () => {
  let userEmail = localStorage.getItem("userEmail");
  console.log(userEmail);
  let response = await fetch("http://localhost:5000/api/orderdata",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { order_data: data,
        email:userEmail,
        order_date: new Date().toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
       })
  }
);
console.log("orderRes:" , response);
if(response.status === 200) {
  dispatch({type: "DROP"})
}
}
    

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
      <table className='table table-hover' style={{ borderRadius: "12px", overflow: "hidden" }}>
          <thead className=' text-success fs-4' >
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0">
                    <MdDelete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                    </button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-dark'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-primary text-white mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}