import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";
import "./style.css"
import{getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore';
import CustomNavbar from './CustomNavbar'
import Footer from './Footer';
const auth = getAuth();
const firestore = getFirestore();
const Rating = () => {
    const [rating, setRating] = useState(0);
    const [ratings, setRatings] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    useEffect(() => {
        // Fetch ratings from Firestore
        const fetchRatings = async () => {
          try {
            const ratingsSnapshot = await getDocs(collection(firestore,'ratings'));
            const ratingsData = ratingsSnapshot.docs.map((doc) => doc.data());
            setRatings(ratingsData);
          } catch (error) {
            console.error('Error fetching ratings:', error);
          }
        };
    
        fetchRatings();
      }, []);
      const handleRatingChange = (value) => {
        setRating(value);
      };
    
      const handleSubmitRating = async () => {
        const user = auth.currentUser;
        const email = user.email;
    
        if (user) {
          try {
            const fetchRatings = async () => {
                try {
                  const ratingsSnapshot = await getDocs(collection(firestore,'ratings'));
                  const ratingsData = ratingsSnapshot.docs.map((doc) => doc.data());
                  setRatings(ratingsData);
                } catch (error) {
                  console.error('Error fetching ratings:', error);
                }
              };
              fetchRatings();
            await setDoc(doc(firestore, 'ratings',email), {
                email: email,
                rating: rating
              }).then((value)=>console.log(value));
            // Reset rating to zero
            setRating(0);
          } catch (error) {
            console.error('Error submitting rating:', error);
          }
        } else {
          console.log('User not authenticated');
          // Handle user not authenticated
        }
      };
      const calculateAverageRating = () => {
        if (ratings.length === 0) return 0;
    
        const sum = ratings.reduce((accumulator, currentRating) => {
          return accumulator + currentRating.rating;
        }, 0);
    
        return sum / ratings.length;
      };
      useEffect(() => {
        setAverageRating(calculateAverageRating());
      }, [ratings]);
    const StarRating = () => {
        const stars = [1, 2, 3, 4, 5];
    
        return (
          <div>
            
            <p style={{fontSize:'50px'}}>Average Rating: {averageRating}</p>
            <p style={{fontSize:'40px'}}>Your Rating: {rating}</p>
            <div style={{fontSize:'50px'}}>
              {stars.map((star) => (
                <span
                  key={star}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleRatingChange(star)}
                >
                  {star <= rating ? '★' : '☆'}
                </span>
              ))}
            </div>
            <button className='btn btn-primary'  onClick={handleSubmitRating}>Submit Rating</button>
          </div>
        );
      };
  return (
    <>
    <CustomNavbar/>
    <div className='card' style={{ display:'flex',justifyContent:'center', alignItems:'center', height:'100vh'}}>
      <h2>Rate Our website</h2>
      <StarRating />
    </div>
    <Footer/>
    </>
  );
}

export default Rating