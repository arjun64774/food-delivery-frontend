import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-contents">

            <div className="footer-content-left">
                <img src={assets.logo} alt="" srcset="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ex harum ea omnis. Laboriosam possimus, maiores nam consequatur aut dicta facilis iste pariatur unde, eius atque quaerat natus quidem maxime?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis odit tempore labore earum dolorem quo.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" srcset="" />
                    <img src={assets.twitter_icon} alt="" srcset="" />
                    <img src={assets.linkedin_icon} alt="" srcset="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-923465798</li>
                    <li>tomato@example.com</li>
                </ul>
            </div>

        </div>

        <hr />
        <p className="footer-copright">Copyright 2026 @ Tomato.com - All Right Reserved</p>
      
    </div>
  )
}

export default Footer
