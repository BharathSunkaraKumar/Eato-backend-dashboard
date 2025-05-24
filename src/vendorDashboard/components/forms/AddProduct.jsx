import React, { useState } from 'react'
import { API_URL } from '../../helpers/ApiPath'
import { data } from 'react-router-dom'

function AddProduct() {
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState([])
    const [bestSeller, setBestSeller] = useState(false)
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')

    const handleCategory = (e) => {
        const value = e.target.value;
        if(category.includes(value)) {
            setCategory(category.filter((item) => item !== value));
        }else{
            setCategory([...category, value]);
        }
    }

    const handleBestSeller = (e) => {
        const value = e.target.value === "true";
        setBestSeller(value);
    }

    const handleImage = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage)
    }

    const handleAddProduct = async(e) => {
        e.preventDefault()
        try{
            const firmId = localStorage.getItem('firmId');
            console.log(firmId)
            const loginToken = localStorage.getItem('loginToken');
            if(!loginToken || firmId) {
                console.log('user not authenticated')
            }
            const formData = new FormData();
            formData.append('productName', productName)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('image', image)

            category.forEach((value) => {
                formData.append('category', value)
            })
        
            
            const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
                method: 'POST',
                body: formData
            })
            const data = await response.json();
            if(response.ok) {
                alert('Product added succesfully')
                setProductName("");
                setPrice("");
                setCategory([]);
                setBestSeller(false);
                setImage(null);
                setDescription("");
            }
        }catch(err){
            console.log(err);
            alert('failed to add product')
        }
    }

  return (
    <div className='firmsection'>
        <form className="tableform" onSubmit={handleAddProduct}>
            <h3>Add Product</h3>
            <label>Product Name</label>
            <input type='text' value={productName} name='productName' onChange={(e)=>setProductName(e.target.value)}/>
            <label>Price</label>
            <input type='text' value={price} name='price' onChange={(e)=>setPrice(e.target.value)}/>
            {/* <label>Category</label>
            <input type='text' /> */}
            <label>Category</label>
            <div className="checkboxinp">
                <div className="inputscontainer">
                    <div className="checkboxcontainer">
                    <label>Veg</label>
                    <input type="checkbox" value='veg' checked= {category.includes('veg')} onChange={handleCategory} />
                </div>
                <div className="checkboxcontainer">
                    <label>Non-Veg</label>
                    <input type="checkbox" value='non-veg' checked= {category.includes('non-veg')} onChange={handleCategory}/>
                </div>
                </div>
            </div>
            {/* <label>BestSeller</label>
            <input type='text' /> */}
            <label>BestSeller</label>
            <div className="checkboxinp">
                <div className="inputscontainer">
                    <div className="checkboxcontainer">
                    <label>Yes</label>
                    <input type="radio" value='true' checked = {bestSeller=== true} onChange={handleBestSeller} />
                </div>
                <div className="checkboxcontainer">
                    <label>No</label>
                    <input type="radio" value='false' checked = {bestSeller === false} onChange={handleBestSeller}/>
                </div>
                </div>
            </div>
            <label>Description</label>
            <input type='text' onChange={(e)=>setDescription(e.target.value)}/>
            <label>Firm Image</label>
            <input type='file' onChange={handleImage}/>
            <div className="btnsubmit">
                <button type='submit'>submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct