import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Hello from '../components/Hello'
import AllProducts from '../components/AllProducts'

function LandingPage() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showFirm, setShowFirm] = useState(false);
    const [showProduct, setShowProduct] = useState(false);
    const [showHello, setShowHello] = useState(false);
    const [showProducts, setShowProducts] = useState(true);
    const [showLogOut, setShowLogOut] = useState(false);
    const [showFirmForm, setShowFirmForm] = useState(true);

    useEffect(()=>{
        const loginToken = localStorage.getItem('loginToken');
        if(loginToken) {
            setShowLogOut(true)
        }
    },[])

    useEffect(()=> {
        const firmName = localStorage.getItem('firmName');
        if(firmName) {
            setShowFirmForm(false)
        }
    },[])
    const handleLogOut = () => {
        const confirmLogout = confirm('are you sure to logout?')
        console.log(confirmLogout)
        if(!confirmLogout) return false
        localStorage.removeItem('loginToken');
        localStorage.removeItem('firmId');
        localStorage.removeItem('firmName');
        setShowLogOut(false)
        setShowFirmForm(true)
    }
    const handleShowLogin = () => {
        setShowLogin(true)
        setShowRegister(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowProducts(false)
    }
    
    const handleShowRegister = () => {
        setShowFirm(false)
        setShowRegister(true)
        setShowLogin(false)
        setShowProduct(false)
        setShowProducts(false)
    }
    const handleShowFire = () => {
        if(showLogOut) {
            setShowFirm(true)
            setShowRegister(false)
            setShowLogin(false)
            setShowProduct(false)
            setShowProducts(false)
        }else{
            alert('please login')
            setShowLogin(true)
        }
    }
    const handleShowProduct = () => {
        if(showLogOut) {
            setShowProduct(true)
            setShowRegister(false)
            setShowLogin(false)
            setShowFirm(false)
            setShowProducts(false)
        }else{
            alert('please login')
            setShowLogin(true)
        }
        
    }
    const handleShowHello = () => {
        setShowHello(true)
        setShowProduct(false)
        setShowRegister(false)
        setShowLogin(false)
        setShowFirm(false)
        setShowProducts(false)
    }
    const handleShowproducts = () => {
        if(showLogOut) {
            setShowProducts(true)
            setShowHello(false)
            setShowProduct(false)
            setShowRegister(false)
            setShowLogin(false)
            setShowFirm(false)
        }else{
            alert('please login')
            setShowLogin(true)
        }
    }
    
  return (
    <>
        <section className='landingsection'>
            <NavBar handleShowLogin={handleShowLogin} handleShowRegister={handleShowRegister} showLogOut={showLogOut} handleLogOut={handleLogOut}/>
            <div className="collectionsection">
                <SideBar handleShowFire={handleShowFire} handleShowProduct={handleShowProduct} handleShowproducts={handleShowproducts} showFirmForm={showFirmForm}/>
                {showLogin && <Login handleShowHello={handleShowHello}/>}
                {showRegister && <Register handleShowLogin={handleShowLogin}/>}
                {showFirm && showLogOut && <AddFirm/>}
                {showProduct && showLogOut && <AddProduct/>}
                {showHello && <Hello/>}
                {showProducts && showLogOut && <AllProducts /> }
                {/* <Login/> */}
                {/* <Register/> */}
                {/* <AddFirm/> */}
                {/* <AddProduct/> */}
            </div>
        </section>
    </>
  )
}

export default LandingPage