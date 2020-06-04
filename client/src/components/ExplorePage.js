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

  const image1 = (
    <img
      src='https://i.picsum.photos/id/119/3264/2176.jpg'
      width='300px'
    />
  )

  const image2 = (
    <img
      src='https://i.picsum.photos/id/557/200/200.jpg'
      width='300px'
    />
  )

  const displayedProducts = products.map((product, idx) => {
    return (
      <figure key={product._id}>
        {
          idx % 2 === 0 
            ? image1
            : image2 
        }
        <figcaption>
          <h3>Item: {product.name}</h3>
          <h4>Price: {product.price}</h4>
        </figcaption>
      </figure>
    )
  })

  return (
    <div className="Wrapper">
      <Navbar />
      <div className="Content">
        {displayedProducts}
      </div>
    </div>
  )
}
