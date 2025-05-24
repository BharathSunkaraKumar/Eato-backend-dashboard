import React from 'react'

function NavBar({handleShowLogin, handleShowRegister, showLogOut, handleLogOut}) {
  const firmName = localStorage.getItem('firmName');
  return (
    <div className='navsection'>
        <div className="compnay">
            Vendor Dashboard
        </div>
        {
          firmName && <div className="firmname">
            <h4>Firmname: {firmName}</h4>
        </div>
        }
        <div className="userauth">
            {
              showLogOut ? <span onClick={handleLogOut}>Logout</span> : (
                <>
                  <span onClick={handleShowLogin}>Login</span>/
                  <span onClick={handleShowRegister}>Register</span>
                </>
              )
            }
            
            
        </div>
    </div>
  )
}

export default NavBar