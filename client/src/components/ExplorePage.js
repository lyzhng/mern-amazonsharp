import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Spinner, Intent } from '@blueprintjs/core';

import Navbar from './Navbar'

export default () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await Axios.get('/api/products')
      console.log(data.products)
      setProducts(data.products)
    }
    fetchProducts().then(() => setLoading(false));
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

  const spinner = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
      <Spinner intent={Intent.PRIMARY} size={100} />
    </div>
  );

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
        {loading ? spinner : displayedProducts}
      </div>
    </div>
  )
}
