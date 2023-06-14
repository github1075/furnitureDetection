import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  setDoc
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const storage = getStorage();
const firestore = getFirestore();
const AddProduct = () => {
    const [imagee, setImagee] = useState();
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUpoading] = useState(false);
  const handleInputChange1 = (event) => {
    setName(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setPrice(event.target.value);
  };

  const handleInputChange3 = (event) => {
    setDetails(event.target.value);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImagee(file);
  };
  const handleUploadImage = async () => {
    if (imagee) {
      try {
        setLoading(true);

        // Create a storage reference with a unique filename
        const storageRef = ref(storage, `images/${imagee.name}`);

        // Upload the image file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, imagee);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(snapshot.ref);
        setImageUrl(downloadURL);
        console.log("Image uploaded successfully" + imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSubmit = async () => {
    try {
        setUpoading(true);
        await addDoc(collection(firestore, "products"), {
            name: name,
            price: price,
            details: details,
            image: imageUrl
          });
    } catch (error) {
        console.log(error);
    } finally{
        setUpoading(false);
    }
  }
  return (
    <div  className="card" style={{ margin: "10px" }}>
              <input type="file" onChange={handleImageChange} />
              <button onClick={handleUploadImage} disabled={loading}>
                {loading ? "Uploading..." : "Upload Image"}
              </button>
              <label>
                Name:
                <input type="text" value={name} onChange={handleInputChange1} />
              </label>
              <br />
              <label>
                price:
                <input
                  type="text"
                  value={price}
                  onChange={handleInputChange2}
                />
              </label>
              <br />
              <label>
                Details:
                <input
                  type="text"
                  value={details}
                  onChange={handleInputChange3}
                />
              </label>
              <br />
              <button onClick={handleSubmit} disabled={loading}>
                {uploading ? "Uploading..." : "Upload Data"}
              </button>
            </div>
  )
}

export default AddProduct