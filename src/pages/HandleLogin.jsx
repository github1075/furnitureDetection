import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HandleLogin = () => {
    const nevigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [key, setKey] = useState(null);
    const [rem, setRem] = useState(null);
    useEffect(()=>{
        const remember = localStorage.getItem('rememberMe');
    const user = localStorage.getItem('userEmail');
    const id = localStorage.getItem('userId');
    setEmail(user);
    setKey(id);
    setRem(remember);
    console.log(remember);
    console.log(user);
    if(user == null) {console.log('user == null');nevigate("/login")}
    else if(remember == 'false') {console.log('not rem');nevigate("/login")}
    else if(user!==null) {console.log('user not null');nevigate(`/dashboard?user=${user+id}`)}
    else nevigate('/login')
    },[]);
    const hendle = ()=>{
        const remember = localStorage.getItem('rememberMe');
    const user = localStorage.getItem('userEmail');
    const id = localStorage.getItem('userId');
        if(user == null) {console.log('user == null');nevigate("/login")}
    else if(remember == 'false') {console.log('not rem');nevigate("/login")}
    else if(user!==null) {console.log('user not null');nevigate(`/dashboard?user=${user+id}`)}
    else nevigate('/login')
    }   
}

export default HandleLogin