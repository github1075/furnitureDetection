import React from 'react'
import { createMemoryRouter, generatePath, useLocation } from 'react-router-dom';
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
  setDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { async, map, RANDOM_FACTOR, uuidv4 } from '@firebase/util';
import Sidebar from './CustomNavbar';
import { getAuth } from "firebase/auth";
import { Firestore } from 'firebase/firestore';
import Comment from './Comment';
import CustomNavbar from './CustomNavbar'
import Footer from './Footer'
let pId;
const firestore = getFirestore();
const ProductDetails = () => {
  let name, image, price, details, pid, like;
  const Auth = getAuth();
  const User = Auth.currentUser;
  let cmtName = User.email;
  const location = useLocation();

  const storage = getStorage();
  const [info, setInfo] = useState([]);
  const [showDiv, setShowDiv] = useState(false);
  const [showBeforeDiv, setShowBeforeDiv] = useState(true);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [user, setUser] = useState(null);

  const productId = location.state.name;
  pId = productId;

  useEffect(() => {
    console.log(pId, productId);
    Fetchdata();


    unsubscribe();

    return () => {

    };
  }, []);

  const unsubscribe = async () => {
    try {
      const auth = getAuth();
      let userf = auth.currentUser;
      console.log("auth  " + userf.email);
      if (userf.email != null) {
        setUser(userf.email);
        // Check if the user has already liked the post
        const snap = await getDoc(doc(firestore, "likes", pId, 'like', `${pId}-${userf.email}`));
        if (snap.data().size != 0)
          setIsLiked(true);
        console.log(isLiked);
      } else {
        setUser(null);
        setIsLiked(false);
      }
    } catch (error) {
      console.log("user" + error);
    }
  }

  const Fetchdata = async () => {
    try {
      console.log(pId, productId + "Product Id ");
    const querySnapshot = await getDoc(doc(firestore, "products", productId));
    console.log("data = " + querySnapshot.data().name);
    name = querySnapshot.data().name;
    image = querySnapshot.data().image;
    price = querySnapshot.data().price;
    details = querySnapshot.data().details;

    pid = querySnapshot.id;

    setInfo(querySnapshot.data());
    console.log("in function = " + name + image + price)
    } catch (error) {
      console.log("fetch data"+ error)
    }
  }
  //console.log("out frame = " + name + image + price);

  //const [,save] = useDatabasePush('comments')
  const [comment, setComment] = useState('')

  const bttnClick = async () => {

    const auth = getAuth();
    let user = auth.currentUser;
    console.log("pid = " + pId);
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    console.log(comment);
    const parentDocRef = doc(firestore, "comment", pId); // reference to the user1 document in the "users" collection
    const subcollectionRef = collection(parentDocRef, "allComment"); // reference to the "messages" subcollection

    const messageData = {
      value: comment,
      date: Date().toLocaleString(),
      name: email,

    };

    await setDoc(doc(subcollectionRef), messageData);
    if (comment != null) {
      if (showDiv && !showBeforeDiv) {
        setShowBeforeDiv(true);
        setShowDiv(false);
      }
      else {
        setShowBeforeDiv(false);
        setShowDiv(true);
      }
    }
  }

  const handleLike = async () => {
    const auth = getAuth();
    let userr = auth.currentUser;
    if (userr != null) {
      // Toggle the like status
      const isCurrentlyLiked = isLiked;
      setIsLiked(!isLiked);

      // Create or delete the like document in Firestore
      //const likeRef = db.collection('likes').doc(`${pId}-${user.email}`);
      if (isCurrentlyLiked) {
        await deleteDoc(doc(firestore, 'likes', pId, 'like', `${pId}-${userr.email}`))
        setLikeCount((count) => count - 1);
      } else {
        await setDoc(doc(firestore, 'likes', pId, 'like', `${pId}-${userr.email}`), {
          email: userr.email
        });
        setLikeCount((count) => count + 1);
      }
    } else {
      alert('You must be logged in to like this post.');
    }
  }

  useEffect(() => {
    console.log("2nd");
    cntlike();

    return () => {

    };
  }, []);

  const cntlike = async () => {
    const collectionRef = collection(firestore, "likes", pId, 'like');

    // Get all the documents in the collection
    getDocs(collectionRef)
      .then((querySnapshot) => {
        // Sum up the size of each document in the collection
        let totalSize = querySnapshot.docs.length;
        console.log(querySnapshot.docs.length);
        setLikeCount(totalSize);
      })
      .catch((error) => {
        // Handle any errors that occurred
        console.error(error);
      });

  }
  return (
    <>
    <CustomNavbar/>
      <div style={{ display: 'grid', justifyContent:'center' }}>
        <div className='card' style={{}}>
          {console.log("frame = " + name + image + price)}
          {
            <Frame
              name={info.name}
              price={info.price}
              image={info.image}
              details={info.details}
              like={info.like}

            />
          }
          <div className='' style={{ display: 'block' }}>
            <button className='btn btn-primary' onClick={handleLike}>{isLiked ? 'Unlike' : 'Like'}</button>
            <span>{likeCount} likes</span>
          </div>

        </div>
        <div style={{ border: '2px solid black'}}>
          <div className='card' style={{ border: '2px solid black'}}>
            <textarea value={comment} onChange={evt => setComment(evt.target.value)} />
          </div>
          <button className='btn btn-primary' onClick={bttnClick}>Comment</button>
          {showDiv &&
            <Comment pId={pId} />
          }
          {showBeforeDiv &&
            <Comment pId={pId} />
          }

        </div>
      </div>
      <Footer/>

    </>
  );
}


const Frame = ({ name, price, image, details, like }) => {

  const navigate = useNavigate();
  console.log("frame = " + name + " " + image + " " + price + " " + details + " " + like);

  const btnClick = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
      let quantity = 1;
      console.log(email);
      await setDoc(doc(firestore, "add-to-cart", email, "products", pId), {
        name: name,
        price: price,
        image: image,
        quantity: 1,
        totalPrice: quantity * price
      });
    }
  }
  return (
    <>
      <div className='' style={{ margin: '1px solid black', display:'flex',justifyContent:'center' }}>
        <img className='' src={image} alt="image product" style={{}} />
        <div style={{ display: 'grid', justifyContent:'center' }}>
          <p className='' style={{ color: "blue", fontSize: '30px' }}>Name : {name}</p>
          <p className='' style={{ color: 'green', fontSize: '40px' }}>Price : {price}</p>
          <p className='text-justify' style={{ fontFamily: 'cursive' }}>{details}</p>
          <button className='btn btn-primary' type='submit' onClick={btnClick}>Add to Cart</button>
        </div>
      </div>
    </>

  );

}

export default ProductDetails