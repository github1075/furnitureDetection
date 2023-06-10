import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from "react";
import "./style.css"
import{getAuth,createUserWithEmailAndPassword,sendEmailVerification} from "firebase/auth";
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore';
import{app} from "../firebase";
import{Link, useNavigate} from 'react-router-dom';
const auth = getAuth();
const firestore = getFirestore();

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);
    const [username, setUsername] = useState('');
    const nevigate = useNavigate();
    useEffect(() => {
        async function fetchUsers() {
          try {
            const querySnapshot = await getDocs(collection(firestore, 'userNames'));
            const user = [];
            querySnapshot.forEach((doc) => {
              user.push(
                doc.data().name
              );
            });
            setUsers(user);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        }
    
        fetchUsers();
        console.log(users);
      }, [firestore]);
    const createUser =async ()=>{
      

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // User registration successful
          const user = userCredential.user;
          console.log('Registered user:', user);
          // Send verification email to the user
          sendVerificationEmail(user);
          nevigate("/login")
        })
        .catch((error) => {
          // Handle registration errors
          console.error('Registration error:', error);
        });
        await setDoc(doc(collection(firestore, 'userNames')), {
            name: username,
          }).then((value)=>console.log(value));

    };
    const sendVerificationEmail = (user) => {
      sendEmailVerification(user)
        .then(() => {
          console.log('Verification email sent');
          // Redirect the user to a verification page or show a success message
        })
        .catch((error) => {
          console.error('Error sending verification email:', error);
        });
    };
    function handleUsernameChange(event) {
        setUsername(event.target.value);
        setIsUsernameTaken(users.includes(event.target.value));
      }

    return (
        <div className="form">
          <div className="form-body">
              <div className="username">
                  <label className="form__label" for="firstName">First Name </label>
                  <input className="form__input" type="text" id="firstName" placeholder="First Name"/>
              </div>
              <div className="lastname">
                  <label className="form__label" for="lastName">Last Name </label>
                  <input  type="text" name="" id="lastName"  className="form__input"placeholder="LastName"/>
              </div>
              <div className="email">
                  <label className="form__label" for="email">Email </label>
                  <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" id="email" className="form__input" placeholder="Email"/>
              </div>
              <div>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={handleUsernameChange}
      />
      {isUsernameTaken && (
        <div style={{ color: 'red' }}>
          This username is already taken. Please choose a different one.
        </div>
      )|| (<p style={{color:'green'}}>unique user name</p>)}
    </div>
              <div className="password">
                  <label className="form__label" for="password">Password </label>
                  <input onChange={(e)=>setPassword(e.target.value)} value={password} className="form__input" type="password"  id="password" placeholder="Password"/>
              </div>
              <div className="confirm-password">
                  <label className="form__label" for="confirmPassword">Confirm Password </label>
                  <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password"/>
              </div>
          </div>
          <div class="footer">
              <button onClick={createUser} type="submit" className="btn btn-dark">Register</button>
          </div>
      </div> 
    );
}
export default SignUp;