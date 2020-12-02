import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data)
    }
    fetchProducts();
  }, []);
  return (
    <>
      <h2>Latest Products</h2>
      <Grid container spacing={1}>
        <Grid container item xs={10} spacing={3}>
          {products.map(product => (<Grid key={product._id} item xs={4}>
            <Paper><Product product={product}/></Paper>
          </Grid>))}
        </Grid>
      </Grid>
    </>
  )
}

export default HomeScreen
