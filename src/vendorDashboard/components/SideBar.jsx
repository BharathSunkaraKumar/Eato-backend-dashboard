import React from 'react'

function SideBar({handleShowFire, handleShowProduct, handleShowproducts, showFirmForm}) {
  return (
    <div className='sidebarsection'>
        <ul>
            {
              showFirmForm ? <li onClick={handleShowFire}>Add Firm</li> : ''
            }
            <li onClick={handleShowProduct}>Add Product</li>
            <li onClick={handleShowproducts}>All Product</li>
            <li>User Details</li>
        </ul>
    </div>
  )
}

export default SideBar