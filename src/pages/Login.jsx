import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";

import "./style.css"

import { app } from "../firebase";
const auth = getAuth();


const Login = () => {
    const nevigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState([]);
    const [rememberMe, setRememberMe] = useState(false);

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
        //if(rememberMe) localStorage.setItem('rememberMe', false);
       // else localStorage.setItem('rememberMe', true);
       localStorage.setItem('rememberMe', rememberMe);
        const s = localStorage.getItem('rememberMe');
        console.log("s= "+s);
      };


    const loginUser = () => {
        if (email == 'admin' && password == 'admin')
            nevigate("/adminHome")
        else
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const session = userCredential;
                    localStorage.setItem('userEmail', session.user.email);
                    localStorage.setItem('userId',session.user.uid);
                    localStorage.setItem('rememberMe', rememberMe);
                    const s= localStorage.getItem('rememberMe');
                    console.log("ss ="+s)
                    nevigate(`/dashboard?user=${session.user.email+userCredential.user.uid}`);
                    //console.log(user);
                })
                .catch((err) => console.log(err));
    }


    return (
        <div className="form">
            <div className="form-body">

                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" className="form__input" placeholder="Email" />
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className="form__input" type="password" id="password" placeholder="Password" />
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMeCheckbox"
                        checked={rememberMe}
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="rememberMeCheckbox">
                        Remember Me
                    </label>
                </div>

            </div>
            <div class="footer">

                <button onClick={loginUser} type="submit" className="btn btn-dark">Login</button><br />
                <p>
                    Didn't have an account? <button onClick={() => nevigate('/signup')} type="submit" className="btn btn-secondary btn-sm">Sign Up</button>
                </p>

            </div>
        </div>
    );
}
export default Login;