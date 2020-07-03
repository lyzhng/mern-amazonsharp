import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../services/Spinner';

import Navbar from './Navbar'

const ExplorePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      console.log(data.products)
      setProducts(data.products)
    }
    fetchProducts().then(() => setLoading(false));
  }, [])

  const displayedProducts = products.map(product => {
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
        {loading ? Spinner : displayedProducts}
      </div>
    </div>
  )
}

export default ExplorePage;
