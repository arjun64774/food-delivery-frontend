import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {

    const {cartItems, addToCart, removeCartItem, url} = useContext(StoreContext);

    const quantity = cartItems?.[id] || 0; // ✅ safe default

    return (
        <div className='food-item'>
            <div className="food-item-image-container">
                <img className='food-item-image' src={url+"/images/"+image} alt="" />

                {quantity === 0 
                    ? <img onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" className='add' />
                    : <div className='food-item-counter'>
                        <img onClick={()=>removeCartItem(id)} src={assets.remove_icon_red} alt="" />
                        <p>{quantity}</p>
                        <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                      </div>
                }
            </div>

            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem
