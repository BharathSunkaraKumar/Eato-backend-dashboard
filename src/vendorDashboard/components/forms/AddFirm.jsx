import React, { useState } from 'react'
import { API_URL } from '../../helpers/ApiPath';
import { data } from 'react-router-dom';

function AddFirm() {
    const [firmName, setFirmname] = useState("");
    const [area, setArea] = useState("");
    const [category, setCategory] = useState([]);
    const [region, setRegion] = useState([]);
    const [offer, setOffer] = useState("");
    const [image, setImage] = useState(null)

    const handleCategory = (e) => {
        const value = e.target.value;
        if(category.includes(value)) {
            setCategory(category.filter((item) => item !== value));
        }else{
            setCategory([...category, value])
        }
    }

    const handleRegion = (e) => {
        const value = e.target.value;
        if(region.includes(value)) {
            setRegion(region.filter((item) => item !== value));
        }else{
            setRegion([...region, value])
        }
    }
    const handleImage = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage)
    }
    const handlefirm = async(e) => {
        e.preventDefault()
        try{
            const loginToken = localStorage.getItem('loginToken');
            if(!loginToken) {
                console.error('user not authenticated');
            }
            const formData = new FormData();
            formData.append('firmName', firmName)
            formData.append('area', area)
            formData.append('offer', offer)
            formData.append('image', image)

            category.forEach((value) => {
                formData.append('category', value)
            })
            region.forEach((value) => {
                formData.append('region', value)
            })
            const response = await fetch(`${API_URL}/firm/add-firm`, {
                method: "POST",
                headers: {
                    'token' : `${loginToken}`
                },
                body: formData
            });
            const data = await response.json()
            if(response.ok) {
                console.log(data)
                alert('firm added successfully')
                setFirmname('');
                setArea('');
                setCategory([]);
                setRegion([]);
                setOffer('');
                setImage(null)
            }else if(data.message === 'vendor can have only one firm'){
                alert("firm exist only 1 firm can be added")
            }else{
                alert('Failed to add Firm')
            }
            const firmId = data.firmId;
            localStorage.setItem("firmId", firmId)
        }catch(err){
            console.log(err)
            alert('firm not added')
        }
    }
  return (
    <div className='firmsection'>
        <form className="tableform" onSubmit={handlefirm}>
            <h3>Add Firm</h3>
            <label>Firm Name</label>
            <input type='text' name='firmName' placeholder='firmName' value={firmName} onChange={(e)=>setFirmname(e.target.value)}/>
            <label>Area</label>
            <input type='text' name='area' placeholder='area' value={area} onChange={(e)=>setArea(e.target.value)}/>
                <label>Category</label>
            <div className="checkboxinp">
                <div className="inputscontainer">
                    <div className="checkboxcontainer">
                    <label>Veg</label>
                    <input type="checkbox" value="veg"  checked= {category.includes('veg')} onChange={handleCategory}/>
                </div>
                <div className="checkboxcontainer">
                    <label>Non-Veg</label>
                    <input type="checkbox" value= "non-veg" checked= {category.includes('non-veg')} onChange={handleCategory}/>
                </div>
                </div>
            </div>
            <label>Region</label>
            <div className="checkboxinp">
                <div className="inputscontainer">
                    <div className="checkboxcontainer">
                    <label>South Indian</label>
                    <input type="checkbox" value="south-indian" checked= {region.includes('south-indian')} onChange={handleRegion}/>
                </div>
                <div className="checkboxcontainer">
                    <label>North Indian</label>
                    <input type="checkbox" value="north-indian" checked= {region.includes('north-indian')} onChange={handleRegion}/>
                </div>
                <div className="checkboxcontainer">
                    <label>Chinese</label>
                    <input type="checkbox" value= "chinese" checked= {region.includes('chinese')} onChange={handleRegion}/>
                </div>
                <div className="checkboxcontainer">
                    <label>Bakery</label>
                    <input type="checkbox" value= "bakery" checked= {region.includes('bakery')} onChange={handleRegion}/>
                </div>
                </div>
            </div>
            <label>Offer</label>
            <input type='text' name='offer' placeholder='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/>
            <label>Firm Image</label>
            <input type='file' onChange={handleImage}/>
            <div className="btnsubmit">
                <button type='submit'>submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm