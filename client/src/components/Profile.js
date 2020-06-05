import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';

import Navbar from "./Navbar";

const Profile = props => {
  const [products, setProducts] = useState([]);
  const [editState, setEditState] = useState({});
  const [currentProduct, setCurrentProduct] = useState(null);
  const [message, setMessage] = useState();
  const history = useHistory();

  const username = props.match.params.username;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await Axios.get(`/api/profile/${username}`);
        if (res.data.success) { 
          // TODO: Find a way to make a callback.
          setProducts(res.data.products);
          for (const p of res.data.products) {
            editState[p._id] = false;
          }
        } else {
          history.push('/not-found');
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, [setProducts, username]);

  return (
    <div className="Wrapper">
      <Navbar />
      <div className="Content" style={{ padding: '1.5rem', }}>
        <h1>{username}'s Store</h1>
        {
          products && products.map(product => {
            return (
              <div className="Product" key={product._id} style={{ margin: '1.5rem auto' }}>
                {message}
                <form onSubmit={ e => e.preventDefault() }>
                  <FormGroup
                    label="Product Name"
                    labelFor="product-name">
                    <InputGroup 
                      type="text" 
                      disabled={ !editState[product._id] }
                      value={ currentProduct !== null && currentProduct._id === product._id ? currentProduct.name : product.name }
                      onChange={e => {
                        console.log('Updated Name', e.target.value);
                        setCurrentProduct({
                          _id: product._id,
                          name: e.target.value,
                          price: (currentProduct !== null && currentProduct._id === product._id) ? currentProduct.price : product.price
                        })
                      }} />
                  </FormGroup>
                  <FormGroup
                    label="Product Price"
                    labelFor="product-price"
                  >
                    <InputGroup
                      type="text"
                      disabled={ !editState[product._id] } 
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
                  </FormGroup>
                <Button
                  icon={ editState[product._id] ? 'saved' : 'edit' }
                  intent={Intent.PRIMARY}
                  text={ editState[product._id] ? 'Save Changes' : 'Edit' }
                  outlined
                  onClick={async () => {
                    console.log(editState[product._id]);
                    if (editState[product._id]) {
                      let res;
                      try {
                        const res = await Axios.put('/api/products/update', {
                          productId: product._id,
                          updatedPrice: currentProduct.price,
                          updatedName: currentProduct.name,
                        });
                        setMessage(res.data.message);
                        if (res.data.success) {
                          const clone = Object.assign({}, editState);
                          clone[product._id] = !clone[product._id];
                          setEditState(clone);
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    } else {
                      const clone = Object.assign({}, editState);
                      clone[product._id] = !clone[product._id];
                      setEditState(clone);
                    }
                  }
                } />
                <Button 
                  icon="delete"
                  intent={Intent.DANGER}
                  text="Delete"
                  outlined
                  style={{ marginLeft: '0.4rem' }}
                  onClick={async () => {
                    try {
                      await Axios.delete('/api/products/delete', {
                        data: { productId: product._id }
                      });
                      setProducts(products.filter(p => p._id !== product._id));
                    } catch (err) {
                      console.error(err);
                    }
                  }} />
              </form>
            </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default Profile;
