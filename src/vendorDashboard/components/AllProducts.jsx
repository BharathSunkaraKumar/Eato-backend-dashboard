import React, { useCallback, useEffect, useState } from 'react'
import { API_URL } from '../helpers/ApiPath';

function AllProducts({handleShowproducts}) {
    const [products, setProducts] = useState([]);

    const productHandler = async() => {
        const firmId = localStorage.getItem('firmId');
        try{
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductData = await response.json();
            setProducts(newProductData.products);
        }catch(err) {
            console.log(err.message)
        }
    };

    useEffect(()=>{
        products.length > 0 && productHandler()
    },[])
    const deleteById = async(id) => {
        console.log('id', id)
        try {
            const response = await fetch(`${API_URL}/product/${id}`,{
                method: 'DELETE',
            })
            if(response.ok) {
                setProducts(products.filter(product => product._id !== id));
                confirm('are you sure? you want to delete this product?')
                alert('Product deleted successfully')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        {/* <h1>AllProducts</h1> */}
        {
            !products || products.length === 0 ? (<p>No products added</p>) : (
                <table className='product-table'>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product) => {
                                return (
                                        <tr key={product._id}>
                                            <td>{product.productName}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                {
                                                    product.image  && (
                                                        <img src={`${API_URL}/uploads/${product.image}`} 
                                                         alt={product.image} 
                                                         style={{width: '50px', height: '50px'}}
                                                        />
                                                    )
                                                }
                                            </td>
                                            <td>
                                                <button onClick={()=>deleteById(product._id)}>Delete</button>
                                            </td>
                                        </tr> 
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }
    </div>
  )
}

export default AllProducts