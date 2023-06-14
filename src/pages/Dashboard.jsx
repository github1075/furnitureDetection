// Import Firestore database
import 'bootstrap/dist/css/bootstrap.min.css';
import { app } from '../firebase';
import { useState, useEffect } from 'react';

import React from 'react'
import backgroundImage from '../jason-leung-Xaanw0s0pMk-unsplash.jpg';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import CustomNavbar from './CustomNavbar';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  limit,
  startAfter,
  endBefore,
  orderBy
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { map } from '@firebase/util';
import Sidebar from './CustomNavbar';
import ProductDetails from './ProductDetails';
import { getAuth } from 'firebase/auth';
import CarouselSlider from './CarouselSlider';
import Footer from './Footer';
import { useNavigate, useLocation } from 'react-router-dom';



//import './read.css';

const myStyle = {
  width: "5 rem"
};

const Dashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const handler = queryParams.get('user');


  var Id;
  var dataa;
  const firestore = getFirestore();
  const storage = getStorage();
  const [info, setInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);
  const nevigate = useNavigate();
  const [user, setUser] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const remember = localStorage.getItem('rememberMe');

  const pageSize = 4;


  const fetchProducts = async (page) => {
    setLoading(true);
    //console.log(queryParams)
    
    const userEmail = localStorage.getItem('userEmail');
    const userId = localStorage.getItem('userId');
    const rem = localStorage.getItem('rememberMe');
    setUser(userEmail);
    setRememberMe(remember);
    console.log(userEmail+userId);
    console.log("rem = "+rem);
    const skip = (page - 1) * pageSize;
    let q = query(collection(firestore, 'products'), orderBy('name'));
    const querySnapshot = await getDocs(q);
    const productsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const slicedProducts = productsData.slice(skip, skip + pageSize);
    //console.log(slicedProducts);
    setPosts(slicedProducts);
    console.log(currentPage);
    posts.map((p) => console.log("id =" + p.id));
    setLoading(false);
  };
  const getTotalPages = async () => {
    const q = query(collection(firestore, 'products'));
    const querySnapshot = await getDocs(q);
    const totalProducts = querySnapshot.size;
    setTotalPages(Math.ceil(totalProducts / pageSize));
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
    console.log(posts);
  }, [currentPage]);

  useEffect(() => {
    getTotalPages();
  }, []);
  

  const getLastDocument = () => {
    const lastDoc = posts[posts.length - 1];
    setLastDocument(lastDoc);
  };
  

  return (
    (user === null) ? <div>{nevigate('/login')}</div> :

      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', }}>

        <div style={{ width: '100%' }}>
          <CustomNavbar />
          <CarouselSlider />
          <div style={{ display: 'grid' }}>
            <div className='product' style={
              {
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                overflow: 'scroll initial'

              }
            } >


              {
                posts.map((element, i) => (
                  <Frame key={i} name={element.name}
                    price={element.price}
                    image={element.image}
                    id={element.id}

                  />
                ))

              }


            </div>

            {!loading && (
              <div>
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                  Previous Page {rememberMe}
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page + 1}
                    onClick={() => goToPage(page + 1)}
                    style={{ fontWeight: currentPage === page + 1 ? 'bold' : 'normal' }}
                  >
                    {page + 1}
                  </button>
                ))}
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                  Next Page
                </button>
              </div>
            )}
          </div>
        </div>
        <Footer />

      </div>

  );
}



const Frame = ({ name, price, image, id }) => {
  const [backgroundColor, setBackgroundColor] = useState('#00BFFF');
  const containerStyle = {
    backgroundColor: backgroundColor,
    color: 'white',
    transition: 'background-color 0.3s ease',
  };
  const navigate = useNavigate();
  //console.log(name + " " + image + " " + price + " " + id);
  var Id = id;
  const btnClick = () => {
    const auth = getAuth();
    console.log(auth.currentUser.email, Id);
    navigate('/details', { state: { id: 1, name: Id } });
  }
  const handleMouseEnter = () => {
    // Change background color on hover
    setBackgroundColor('red');
  };

  const handleMouseLeave = () => {
    // Revert back to original background color on hover out
    setBackgroundColor('blue');
  };

  return (
    <>
      <div key={id} className='product card' style={{ height: '15rem', width: '15rem', border: '2px solid black', margin: '20px' }} >
        <div style={{ containerStyle }} onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <div className="center" style={containerStyle} onMouseEnter={handleMouseEnter
          } onMouseLeave={handleMouseLeave}>
            <img className='' src={image} alt="image product" style={{ height: '7rem', width: '10rem' }} />
            <p className=''>Name : {name}</p>
            <p className=''>Price : {price}</p>
            <button className='btn btn-primary' onClick={btnClick}>Details</button>
          </div>

        </div>

      </div>

    </>

  );

}   // Display the result on the page



// Define how each display entry will be structured

export default Dashboard;
