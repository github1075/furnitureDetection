import React from 'react'
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDocs, collection, getFirestore, deleteField, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard';
import CustomNavbar from './CustomNavbar'
import Footer from './Footer';
var totalAmount;
 totalAmount= 0;
const Cart = () => {
    const firestore = getFirestore();
    const [info, setInfo] = useState([]);
    const [amount, setAmount] = useState(totalAmount);
    let check;
    useEffect(() => {
        totalAmount = 0;
        Fetchdata();
        return () => { };
    }, [])
    const Fetchdata = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const email = user.email;
        console.log(email);
        await getDocs(collection(firestore, "add-to-cart", email, "products"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setInfo(newData);
                info.map((p,i)=>(totalAmount= totalAmount + Number(p.price)));
                if(info.length == 0)
                setAmount(0);
                else
                setAmount(totalAmount)
                console.log(info, newData);
            })
    }
    console.log(info.length);
    console.log(totalAmount);
    
    if (info.length == 0)
        return (<div className='card'>
            <CustomNavbar/>
            <h1>Your Cart is empty!</h1>
            <Footer/>
        </div>);
    return (
        <>
        <CustomNavbar/>
            <div style={{display:'flex'}}>
            <div className='' style={
                {
                    width:'60%',
                    border:'5px solid black'
                }
            }>


                {
                    info.map((element, i) => (
                        <Frame key={i} name={element.name}
                            price={element.price}
                            image={element.image}
                            id={element.id}
                            totalPrice={element.totalPrice}
                            quantity={element.quantity}

                        />
                    ))
                }
            </div>
            <div className='card' style={{width:'35%', marginLeft:'15px'}}>
                <h3 style={{textAlign:'center',textDecoration:'underline'}}>Voucher</h3>
                <p>{amount}</p>
            </div>
            </div>
            <Footer/>

        </>
    );

}

const Frame = ({ name, price, image, id, quantity, totalPrice }) => {
    console.log(name + " " + image + " " + price + " " + id + " " + quantity + " " + totalPrice);
    var Id = id;
    //totalAmount =0;
    // totalAmount = (totalAmount + Number(price));
     console.log("total = "+totalAmount)
    let [qntty, setQntty] = useState(quantity);
    let [tprice, setTprice] = useState(price);
    let [product, setProduct] = useState([name, price, quantity, totalPrice, image]);

    const nevigate = useNavigate();

    //console.log(qntty,tprice);
    const plus = () => {
        setQntty(qntty + 1);
        setTprice((qntty + 1) * price);
        totalAmount = totalAmount + Number(tprice);
        console.log(qntty, tprice, price);
    }
    const minus = () => {
        setQntty(qntty - 1);
        setTprice((qntty - 1) * price);
        totalAmount = totalAmount + Number(tprice);
        console.log(qntty, tprice, price);
    }
    const deleteDocument = () => {

        const auth = getAuth();
        const firestore = getFirestore();
        const user = auth.currentUser;
        const email = user.email;


        const docRef = doc(collection(firestore, 'add-to-cart', email, 'products'), Id);
        deleteDoc(docRef)
            .then(() => {
                console.log('Document successfully deleted!');

            })
            .catch((error) => {
                console.error('Error removing document: ', error);
            });
        document.getElementById(Id).remove()
    }

    return (
        <>
            <div key={Id} id={Id} className='card'
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                }}>
                <div style={{ width: '40%', backgroundColor: 'gray' }}>
                    <img src={image} width='100%' height='200px' alt='Product Image' />
                </div>
                <div style={{
                    backgroundColor: 'Highlight',
                    width: '40%'
                }}>
                    <p>Name: {name}</p>
                    <p>price:{price}</p>
                    <p>Qantity:{qntty}</p>
                    <p>Total Price: {tprice}</p>
                </div>
                <div>
                    <button className='btn btn-outline-primary' onClick={plus}>Qantity++</button>
                    <p>{qntty}</p>
                    <button className='btn btn-outline-primary' onClick={minus}>Qantity--</button>
                </div>
                <div className='btn'>
                    <button type='submit' className='btn btn-outline-danger' id='delete' onClick={deleteDocument}>Delete</button>
                </div>

            </div>
        </>

    );

}


export default Cart;