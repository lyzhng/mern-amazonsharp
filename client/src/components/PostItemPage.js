import React, { useRef, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Axios from 'axios';

import Navbar from './Navbar';
import { UserContext } from '../context/UserContext';

const PostItemPage = () => {
  const { user, _ } = useContext(UserContext);
  const productName = useRef();
  const productPrice = useRef();

  return (
    <div className="Wrapper">
      <Navbar />
      <Container fluid className="PostItem m-3">
        <Form onSubmit={
          async (e) => { 
            e.preventDefault();
            try {
              await Axios.post('/api/products/new', {
                productName: productName.current.value,
                productPrice: productPrice.current.value,
                username: user,
              });
            } catch (err) {
              console.error(err);
            }
          }
        }>
          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" name="productName" ref={ productName } />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Price</Form.Label>
            <Form.Control type="text" name="productPrice" ref={ productPrice }/>
          </Form.Group>
          <Button variant="outline-primary" type="submit">Post Item</Button>
        </Form>
      </Container>
    </div>
  );
};

export default PostItemPage;

