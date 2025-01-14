import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/account.css'
import icon from "../images/apple-touch-icon.png";
import { handleRegister } from "../components/AccountComponents";
import GlobalContext from "../GlobalContext.jsx";


export default function () {
    const { createAccount } = useContext(GlobalContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const submit = (e) => {
        e.preventDefault()
        createAccount(email, password, fullName, phoneNumber)
    }
    return <section className="account">
        <form onSubmit={submit} id="formData" action="/login" className="cover createAccountCover">
            <img className="loginImg accountImg" src={icon} alt="" />
            <label htmlFor="fullname">Fullname</label>
            <input type="text" id="fullname" name="name" placeholder="full name"
                value={fullName} onChange={event => setFullName(event.target.value)}></input>
            <p id="name"></p>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" placeholder="email"
                value={email} onChange={(event) => setEmail(event.target.value)}></input>
            <p id="mail"></p>
            <label htmlFor="phone number">Phone number</label>
            <input onKeyDown={(e) => (e.key !== "Backspace" && !/[0-9 +]+/.test(e.key)) && e.preventDefault()} placeholder="+46" id="tel" name="tel"
                value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)}></input>
            <p id="phone"></p>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="password" name="password" minLength="8" id={"password"}
                value={password} onChange={(event) => setPassword(event.target.value)}></input>
            <p id="pwrd"></p>
            <label htmlFor="confirm password">Confirm password</label>
            <input type="password" placeholder="confirm password" minLength="8" id={"confirmPassword"} name="confirmPassword"></input>
            <p id="pwrdc"></p>
            <br />
            <div className="button-group">
                <button type="submit" className="button" onClick={handleRegister}>REGISTER</button>
                <Link to="/login"><button className="button-text">Already have an account? Sign in.</button></Link>
            </div>
        </form>
    </section>
}