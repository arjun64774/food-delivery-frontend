import React, { useContext, useEffect, useState } from 'react'
import './MyOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrder = () => {

    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{Authorization:`Bearer ${token}`}});
        setData(response.data.data);        
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

    return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.length === 0 ? (
            <p>No orders yet!</p>
            ) : (
            data
                .filter(order => order.items && order.items.length > 0) // only orders with items
                .map((order, index) => (
                <div key={index} className='my-orders-order'>
                    <img src={assets.parcel_icon} alt=""/>
                    <p>{order.items.map(item => `${item.name} x ${item.quantity}`).join(", ")}</p>
                    <p>${order.amount}.00</p>
                    <p>Items: {order.items.length}</p>
                    <p><span>&#x25cf; </span><b>{order.status}</b></p>
                    <button onClick={fetchOrders} >Track Order</button>
                </div>
                ))
            )}
        </div>
    </div>

  )
}

export default MyOrder
