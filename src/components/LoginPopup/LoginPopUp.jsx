import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopUp = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState("Login")

    const { url, login } = useContext(StoreContext)

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value.trim() }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const apiUrl =
                currState === "Login"
                    ? `${url}/api/user/login`
                    : `${url}/api/user/register`

            const response = await axios.post(apiUrl, data)

            if (!response.data.success) {
                toast.error(response.data.message)
                return
            }

            // ✅ LOGIN SUCCESS
            if (currState === "Login") {
                await login(response.data.token,response.data.user)
                toast.success("Login successful 🎉")
                setShowLogin(false)
            }

            // ✅ SIGNUP SUCCESS
            if (currState === "Sign Up") {
                toast.success("Account created successfully. Please login 🔐")
                setCurrState("Login")
                setData({ name: "", email: "", password: "" })
            }

        } catch (error) {
            toast.error("Something went wrong. Please try again.")
            console.error(error)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onSubmitHandler} className="login-popup-container">

                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img
                        src={assets.cross_icon}
                        alt="close"
                        onClick={() => setShowLogin(false)}
                        style={{ cursor: "pointer" }}
                    />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={data.name}
                            onChange={onChangeHandler}
                            required
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={data.email}
                        onChange={onChangeHandler}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                <button type="submit">
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currState === "Login" ? (
                    <p>
                        Create a new account?{" "}
                        <span onClick={() => setCurrState("Sign Up")}>
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => setCurrState("Login")}>
                            Login here
                        </span>
                    </p>
                )}
            </form>
        </div>
    )
}

export default LoginPopUp
