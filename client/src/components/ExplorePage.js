import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner, Intent } from '@blueprintjs/core';

import Navbar from './Navbar'

const ExplorePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoadingRes, setIsLoadingRes] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      console.log(data.products)
      setProducts(data.products)
    }
    fetchProducts().then(() => setIsLoadingRes(false));
  }, [])

  const spinner = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
      <Spinner intent={Intent.PRIMARY} size={100} />
    </div>
  );

  const displayedProducts = products.map((product, idx) => {
    return (
      <figure key={product._id}>
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
        {isLoadingRes ? spinner : displayedProducts}
      </div>
    </div>
  )
}

export default ExplorePage;
