import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import products from '../products';
import Product from '../components/Product';

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
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
