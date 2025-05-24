import React, { useState } from 'react'
import { API_URL } from '../../helpers/ApiPath';

function Register({handleShowLogin}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [isloading, setIsloading] = useState(true);

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      console.log('hi')
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password})
      })
      console.log(console.log(response))
      const data = await response.json();
      if(!response.ok) {
        console.log(data.message || 'somting went wrong')
      }
      if(response.ok){
        console.log(data)
        setUsername("");
        setEmail("");
        setPassword("");
        alert('vendor registered success')
        handleShowLogin()
      } 
    }catch(err) {
      console.log(err.message)
      alert('vendor registered failed')
    }
  }
  return (
    <div className='registersection'>
        <form className='authform' onSubmit={handleSubmit}>
            <h3>Vendor Register</h3>
            <label>UserName</label>
            <input type="text" name='username' value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='Enter your User Name' />

            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your email' />

            <label>Password</label>
            <input type="password" name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your password' />

            <div className="btnsubmit">
                <button type='submit'>submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register