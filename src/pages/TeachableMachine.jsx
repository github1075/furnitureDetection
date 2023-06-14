import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import CustomNavbar from './CustomNavbar'
import Footer from './Footer';

function TeachableMachine() {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [imagee, setImagee]= useState();
  const imageRef = useRef(null);

  const loadModel = async () => {
    try {
      const model = await tf.loadLayersModel('https://storage.googleapis.com/tm-model/SkGRjNtMm/model.json');
      setModel(model);
    } catch (error) {
      console.error('Failed to load model:', error);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const predictImage = async () => {
    try {
      if (!model) {
        console.error('Model not loaded');
        return;
      }

      if (!imageRef.current) {
        console.error('Image not loaded');
        return;
      }

      const image = tf.browser.fromPixels(imageRef.current);
      console.log(image);
      const resizedImage = tf.image.resizeBilinear(image, [224, 224]);
      const expandedImage = resizedImage.expandDims();
      const predictions = await model.predict(expandedImage).data();
      console.log("prediction = "+predictions);
      setPredictions(predictions);
      image.dispose();
      resizedImage.dispose();
      expandedImage.dispose();
    } catch (error) {
      console.error('Failed to predict image:', error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagee(reader.result);
    };
  };

  return (<>
  <CustomNavbar/>
    <div style={{display:'grid',justifyItems:'center'}}>
      <h1 style={{color:'black'}}>Furniture Classification</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <div style={{border:'2px solid black',width:'25%',display:'grid',backgroundColor:'navy'}}>
      <button style={{backgroundColor:'burlywood'}} onClick={async () => {
        const imageURL = imagee;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          imageRef.current = img;
          predictImage();
        };
        img.src = imageURL;
      }}>Predict</button>
      </div>
      {predictions.length > 0 && (
        <div className='card' style={{width:'25%',fontSize:'15px'}}>
          <ul style={{fontFamily:'monospace'}}>
          <li>Table = {predictions[0] * 100}%</li>
          <li>Chair = {predictions[1] * 100}%</li>
          <li>Sofa = {predictions[2] * 100}%</li>
          <li>Bed = {predictions[3] * 100}%</li>
        </ul>
      </div>
      )}
      <img src={imagee}/>
    </div>
    <Footer/>
    </>
  );
}

export default TeachableMachine;