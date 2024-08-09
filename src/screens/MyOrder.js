import React, { useEffect, useState } from 'react';

function MyOrder() {
    const [orderData, setOrderData] = useState([]);


    const fetchMyOrder = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/myorderdata", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const response = await res.json();
            console.log('Fetched order data:', response.orderData);
            setOrderData(response.orderData.order_data);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);


    console.log("orderData ", orderData);

    return (
        <div className='container'>
            {orderData.length > 0 ? (
                orderData.slice(0).reverse().map((order, index) => (
                    <div className='row' key={index}>
                        {order.map((arrayData, idx) => (
                            <React.Fragment key={idx}>
                                {arrayData.Order_date ? (
                                    <div className='m-auto mt-5'>
                                        <hr />
                                        <div className='d-flex justify-content-between fs-5'>
                                            <p>{arrayData.Order_date}</p>
                                        </div>
                                        <hr />
                                    </div>
                                ) : (
                                    <div className='col-12 col-md-6 col-lg-3'>
                                        <div
                                            className='card mt-3'
                                            style={{
                                                width: '16rem',
                                                maxHeight: '360px',
                                            }}
                                        >
                                            <img
                                                src={arrayData.img}
                                                className='card-img-top'
                                                alt='...'
                                                style={{
                                                    height: '150px',
                                                }}
                                            />
                                            <div className='card-body'>
                                                <h5 className='card-title'>
                                                    {arrayData.name}
                                                </h5>
                                                <div
                                                    className='container w-100 p-0'
                                                    style={{
                                                        height: '38px',
                                                    }}
                                                >
                                                    <span className='m-1'>
                                                        {arrayData.qty}
                                                    </span>
                                                    <span className='m-1'>
                                                        {arrayData.size}
                                                    </span>
                                                    <span className='m-1'>
                                                        {arrayData.Order_date}
                                                    </span>
                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                        ₹{arrayData.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                ))
            ) : (
                <center className='fs-1 mt-5 text-secondary' style={{ fontFamily: 'Serif' }}>No order data available</center>
            )}
        </div>
    );
}

export default MyOrder;
