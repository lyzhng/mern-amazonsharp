import React, { useRef, useContext, useState } from 'react';
import axios from 'axios';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';

import Navbar from './Navbar';
import { UserContext } from '../context/UserContext';

const PostItemPage = () => {
  const { user } = useContext(UserContext);
  const productName = useRef();
  const productPrice = useRef();
  const [message, setMessage] = useState();

  return (
    <div className="Wrapper">
      <Navbar />
      <div className="Content" style={{ padding: '1.5rem', }}>
        {message}
        <form onSubmit={
          async (e) => { 
            e.preventDefault();
            try {
              const res = await axios.post('/api/products', {
                productName: productName.current.value,
                productPrice: productPrice.current.value,
                username: user,
              });
              setMessage(res.data.message);
            } catch (err) {
              console.error(err);
            }
          }
        }>
          <FormGroup label="Product Name" labelFor="product-name">
            <InputGroup id="product-name" type="text" name="productName" inputRef={ productName } />
          </FormGroup>
          <FormGroup label="Product Price" labelFor="product-price">
            <InputGroup id="product-price" type="text" name="productPrice" inputRef={ productPrice } />
          </FormGroup>
          <Button intent="primary" type="submit" text="Post Item" />
        </form>
      </div>
    </div>
  );
};

export default PostItemPage;

