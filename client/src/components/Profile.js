import React from 'react';
import Axios from 'axios';
import { Container } from "react-bootstrap";

import Navbar from "./Navbar";

const Profile = props => {
  const [products, setProducts] = React.useState([]);
  const username = props.match.params.username;

  React.useEffect(() => {
    async function fetchProducts() {
      const res = await Axios.get(`/api/store/${username}`);
      setProducts(res.data.products);
    }
    fetchProducts();
  }, []);

  return (
    <div className="Wrapper">
      <Navbar />
      <Container fluid className="Profile m-3">
        <h2>{username}</h2>
        <h4>Store</h4>
        {
          products.map(product => {
            return (
              <div>
                <h4>{product.name}</h4>
                <h4>{product.price}</h4>
              </div>
            )
          })
        }
      </Container>
    </div>
  )
};

export default Profile;
