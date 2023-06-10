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
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AdminNavbar from "./AdminNavbar";
const storage = getStorage();
const AdminHome = () => {
  const firestore = getFirestore();
  const [info, setInfo] = useState([]);
  const [imagee, setImagee] = useState();
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const handleInputChange1 = (event) => {
    setName(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setPrice(event.target.value);
  };

  const handleInputChange3 = (event) => {
    setDetails(event.target.value);
  };
  useEffect(() => {
    Fetchdata();

    return () => {};
  }, []);
  // Fetch the required data using the get() method
  const Fetchdata = async () => {
    await getDocs(collection(firestore, "products")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setInfo(newData);
      info.map((product)=>console.log(product.id));
    });
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
  const handleClick = async (id) => {
    const documentRef = doc(firestore, "products", id);
    // Update the data using the updateDoc function
    try {
      await updateDoc(documentRef, {
        name: name,
        details: details,
        price: price,
        image: imageUrl,
      });
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <div style={{ margin: "2px" }}>
        <AdminNavbar/>
      <h1 style={{ display: "flex", justifyContent: "center " }}>
        Product List
      </h1>
      <div className="card" style={{ display: "flex", flexWrap: "wrap" }}>
        {info.map((product) => (
          <div
            key={product.id}
            style={{ display: "flex", flexWrap: "wrap", height: "100%" }}
          >
            <div style={{ width: "30%", height: "40%" }}>
              <img src={product.image} alt={product.name} />
            </div>
            <div style={{ width: "30%" }}>
              <h3>{product.name}</h3>
              <p>{product.details}</p>
              <p>Price: ${product.price}</p>
            </div>
            <div key={product.id} className="card" style={{ margin: "10px" }}>
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
              <button onClick={() => handleClick(product.id)}>Submit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
