import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Container, Row, Col, Figure } from 'react-bootstrap'

import Navbar from './Navbar'

export default () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await Axios.get('/api/products')
      console.log(data.products)
      setProducts(data.products)
    }
    fetchProducts()
  }, [])

  const displayedProducts = products.map((product, idx) => {
    return (
      <Col
        xs={12}
        sm={8}
        md={6}
        lg={3}
        key={product.id}
        className='SingleProduct my-2'
      >
        <Figure>
          {idx % 2 === 0 ? (
            <Figure.Image
              fluid
              thumbnail
              src='https://i.picsum.photos/id/119/3264/2176.jpg'
            />
          ) : (
              <Figure.Image
                fluid
                thumbnail
                src='https://i.picsum.photos/id/557/200/200.jpg'
              />
            )}
          <Figure.Caption className='text-center'>
            <h6>Item: {product.name}</h6>
            <h6>Price: {product.price}</h6>
          </Figure.Caption>
        </Figure>
      </Col>
    )
  })

  return (
    <div className='Wrapper'>
      <Navbar />
      <Container fluid className='Explore m-3'>
        <Row className='justify-content-start align-items-start text-center'>
          {displayedProducts}
        </Row>
      </Container>
    </div>
  )
}
