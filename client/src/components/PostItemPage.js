import React, { useRef, useContext, useState } from 'react';
import axios from 'axios';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';

import Navbar from './Navbar';
import { UserContext } from '../context/UserContext';

const PostItemPage = () => {
  const { user } = useContext(UserContext);
  const productName = useRef();
  const productPrice = useRef();
  const [file, setFile] = useState();
  const [message, setMessage] = useState();

  return (
    <div className="Wrapper">
      <Navbar />
      <div className="Content" style={{ padding: '1.5rem', }}>
        {message}
        <form encType="multipart/form-data" onSubmit={
          async (e) => { 
            e.preventDefault();
            try {
              const data = new FormData();
              data.append('productName', productName.current.value);
              data.append('productPrice', productPrice.current.value);
              data.append('username', user);
              data.append('file', file);
              const res = await axios.post('/api/products', data);
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
          <input type="file" name="file" onChange={e => {
            const file = e.target.files[0];
            setFile(file);
          }} />
          <Button intent="primary" type="submit" text="Post Item" />
        </form>
      </div>
    </div>
  );
};

export default PostItemPage;

