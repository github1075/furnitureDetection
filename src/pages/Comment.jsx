import React from 'react'
import { generatePath, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { app } from '../firebase';
import { useState, useEffect } from 'react';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  setDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Firestore } from 'firebase/firestore';


const Comment = (props) => {
  const firestore = getFirestore();
  const [comments, setComments] = useState([props.pId]);
  useEffect(() => {
    console.log(comments);
    Fetchdata();

    return () => {

    };
  }, []);
  const Fetchdata = async () => {
    await getDocs(collection(firestore, "comment", props.pId, "allComment"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setComments(newData);
        console.log("comment = "+comments, newData);
      })
  }
  //pId = props.pId;
  return (
    <div style={{marginLeft:'3%'}}>
      
      {
            comments.map((element, i) => (
              <Frame key={i} 
                name = {element.name}
                date = {element.date}
                value = {element.value}
                id = {element.id}

              />
            ))

          }
    </div>
  )
}

const Frame = ({ name, date, value, id }) => {
  const navigate = useNavigate();
  console.log(name + " " + date + " " + value );
  

  return (
    <>
      <div key={id} className='' style={{border:'1px solid black', backgroundColor:'white',marginTop:'3px',borderRadius:'30x',display:'grid',justifyContent:'center'}}>
        <p style={{fontSize:'25px'}}>{name}</p>
        <p>{value}</p>
        <p style={{fontSize:'15px',color:'gray'}}>{date}</p>
      </div>

    </>

  );

}

export default Comment