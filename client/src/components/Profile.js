import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Container } from "react-bootstrap";

import Navbar from "./Navbar";

const Profile = props => {
  const [products, setProducts] = useState([]);
  const [editState, setEditState] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const username = props.match.params.username;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await Axios.get(`/api/store/${username}`);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, [setProducts, username]);

  return (
    <div className="Wrapper">
      <Navbar />
      <Container fluid className="Profile m-3">
        <h2>{username}</h2>
        <h4>Store</h4>
        {
          products.map(product => {
            return (
              <div key={product._id}>
                <input 
                  type="text" 
                  disabled={ !editState } 
                  value={ currentProduct !== null && currentProduct._id === product._id ? currentProduct.name : product.name } 
                  onChange={({ target }) => {
                    console.log('Updated Name', target.value);
                    setCurrentProduct({
                      _id: product._id,
                      name: target.value,
                      price: (currentProduct !== null && currentProduct._id === product._id) ? currentProduct.price : product.price
                    })
                  }}
                /> 
                <input 
                  type="text"
                  disabled={ !editState }
                  value={ 
                    (currentProduct !== null && currentProduct._id === product._id)
                      ? currentProduct.price 
                      : product.price
                  } 
                  onChange={({ target }) => {
                    console.log('Updated Price', target.value);
                    setCurrentProduct({
                      _id: product._id,
                      name: (currentProduct !== null && currentProduct._id === product._id) ? currentProduct.name : product.name,
                      price: target.value,
                    })
                  }}
                /> 
                <button 
                  onClick={async () => {
                    try {
                      await Axios.delete('/api/products/delete', {
                        data: { productId: product._id }
                      });
                      setProducts(products.filter(p => p._id !== product._id));
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >Delete
                </button>
                <button
                  onClick={async () => {
                    if (editState) {
                      try {
                        await Axios.put('/api/products/update', {
                          productId: product._id,
                          updatedPrice: currentProduct.price,
                          updatedName: currentProduct.name,
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    } 
                    setEditState(!editState);
                  }}>
                { editState ? 'Save Changes' : 'Edit' }
                </button>
              </div>
            )
          })
        }
      </Container>
    </div>
  )
};

export default Profile;
