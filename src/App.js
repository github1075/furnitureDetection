
import React, {useState, useEffect} from "react"; 
import { Navbar, Nav } from 'rsuite';
import SignUp from './pages/SignUp'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import {BrowserRouter, Route,Routes  } from 'react-router-dom';   
import Sidebar from './pages/CustomNavbar';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import TeachableMachine from './pages/TeachableMachine';
import Location from './pages/Location';
import Iframee from './pages/Iframee';
import Rating from './pages/Rating';
import AdminHome from './pages/AdminHome';
import AddProduct from './pages/AddProduct';
import ProductSearch from "./pages/ProductSearch";
import HandleLogin from "./pages/HandleLogin";



function App() {
  const [activeKey, setActiveKey] = React.useState(null);
  
  
 
  return (
    <div className="App">
      
    <div className="App">
      
      
      <Routes>
      <Route path='/' element = {<HandleLogin/>} />
        <Route path='/sidebar' element = {<Sidebar/>} />
        <Route path='/signup' element = {<SignUp/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/dashboard' element = {<Dashboard/>}/>
        <Route path='/details' element = {<ProductDetails/>}/>
        <Route path='/cart' element = {<Cart/>}/>
        <Route path='/classification' element = {<TeachableMachine/>}/>
        <Route path='/location' element = {<Location/>} />
        <Route path='/iframe' element = {<Iframee/>}/>
        <Route path='/rating' element = {<Rating/>}/>
        <Route path='/adminHome' element = {<AdminHome/>}/>
        <Route path="/search" element = {<ProductSearch/>}/>
        <Route path='/addproduct' element = {<AddProduct/>}/>
      </Routes>
      

    </div>
    </div>
  );
}

export default App;
