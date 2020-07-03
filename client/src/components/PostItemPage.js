import React, { useRef, useContext, useState } from 'react';
import axios from 'axios';
import { FormGroup, InputGroup, Button, FileInput } from '@blueprintjs/core';

import Navbar from './Navbar';
import { UserContext } from '../context/UserContext';

const PostItemPage = () => {
  const { user } = useContext(UserContext);
  const [productImage, setProductImage] = useState(null);
  const productName = useRef();
  const productPrice = useRef();
  const [message, setMessage] = useState();
  const formRef = useRef();
  const [uploadedFile, setUploadedFile] = useState({});

  const postItem = async () => {
    try {
      const fd = new FormData();
      if (productImage !== null) {
        fd.append('productImage', productImage[0], productImage.name);
      }
      fd.append('productName', productName.current.value);
      fd.append('productPrice', productPrice.current.value);
      fd.append('username', user);
      const res = await axios.post('/api/products', fd);
      const { message, fileName, filePath } = res.data;
      setMessage(message);
      setUploadedFile({ fileName, filePath });
      console.log(uploadedFile);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="Wrapper">
      <Navbar />
      <div className="Content" style={{ padding: '1.5rem', }}>
        {message}
        <form onSubmit={e => e.preventDefault()} ref={formRef}>
          <FormGroup label="Product Name" labelFor="product-name">
            <InputGroup id="product-name" type="text" name="productName" inputRef={ productName } />
          </FormGroup>
          <FormGroup label="Product Price" labelFor="product-price">
            <InputGroup id="product-price" type="text" name="productPrice" inputRef={ productPrice } />
          </FormGroup>
          <FormGroup label="How does your product look like?" labelFor="prodict-images">
            <FileInput text="Product Images" onInputChange={
              e => {
                console.log(e.target.files);
                setProductImage(e.target.files);
              }
            } id="product-images" />
          </FormGroup>
            <Button intent="primary" type="button" text="Post Item" onClick={e => {
              e.preventDefault();
              postItem();
            }}/>
        </form>
        {
          uploadedFile && <img src={uploadedFile.filePath} alt={uploadedFile.fileName} />
        }
      </div>
    </div>
  );
};

export default PostItemPage;

