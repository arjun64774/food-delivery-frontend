import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeCartItem, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  // Filter only items in cart
  const cartProducts = food_list.filter(item => cartItems[item._id] > 0);

  return (
    <div className='cart'>
      <h2>Your Cart</h2>

      {cartProducts.length === 0 ? (
        <p className="cart-empty">Your cart is empty 😔</p>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Item</p>
              <p>Name</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr />

            {cartProducts.map((item, index) => (
              <div key={item._id} className="cart-items-title cart-items-item">
                {/* Image */}
                <img
                  className='food-item-image'
                  src={item.image}
                  alt={item.name}
                />

                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p
                  onClick={() => removeCartItem(item._id)}
                  className='cross'
                  style={{ cursor: 'pointer', color: 'red' }}
                >
                  X
                </p>
              </div>
            ))}
            <hr />
          </div>

          {/* Cart totals */}
          <div className="cart-bottom">
            <div className="cart-total">
              <h3>Cart Totals</h3>
              <div className="cart-total-details">
                <p>Subtotal:</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee:</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <div className="cart-total-details">
                <strong>Total:</strong>
                <strong>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</strong>
              </div>

              <button
                className='checkout-btn'
                onClick={() => navigate('/order')}
                disabled={cartProducts.length === 0}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>

            {/* Promo code */}
            <div className="cart-promocode">
              <p>If you have a promo code, enter it here:</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='Promo code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
