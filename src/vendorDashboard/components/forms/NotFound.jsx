import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='errorsection'>
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to ='/'>homepage</Link>
    </div>
  )
}

export default NotFound