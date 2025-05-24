import React, { useState } from 'react'
import { API_URL } from '../../helpers/ApiPath';

function Login({handleShowHello}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault()
    try{
       const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      const data = await response.json();
      if(response.ok) {
        alert('login success');
        localStorage.setItem('loginToken', data.token);
        setEmail("")
        setPassword("");
        handleShowHello()
      }
      const vendorId = data.vendorId;
      // console.log(data)
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      const vendorData = await vendorResponse.json();
      if(vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorFirmId;
        const VendorFirmName = vendorData.vendor.firm[0].firmName;
        console.log(VendorFirmName)
        console.log('check '+vendorFirmId);
        localStorage.setItem('firmId', vendorFirmId);
        localStorage.setItem('firmName', VendorFirmName);
        window.location.reload()
      }
    }catch(err) {
      console.log(err);
      alert('login failed')
    }
  }
  return (
    <div className='loginsection'>
        <form className='authform' onSubmit={handleLogin}>
            <h3>Vendor Login</h3>
            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' />
            <label>Password</label>
            <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' />
            <div className="btnsubmit">
                <button type='submit'>submit</button>
            </div>
        </form>
    </div>
  )
}

export default Login


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZW5kb3JJZCI6IjY4MmE5ODg3YTc4ZmFhMTU3NDBlNDZiYiIsImlhdCI6MTc0NzgyODQzOSwiZXhwIjoxNzQ3ODMyMDM5fQ.VRgQM44wCnxBJPF7IfCXHRaN52S3vbR7cCj-imPqdHc

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZW5kb3JJZCI6IjY4MmE5ODg3YTc4ZmFhMTU3NDBlNDZiYiIsImlhdCI6MTc0NzgyODUyMiwiZXhwIjoxNzQ3ODMyMTIyfQ.wizSlP-iouRNfym3cbHqcvU7euWvtvVU2Fa_HktVb88