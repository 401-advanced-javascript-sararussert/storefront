import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]);
  return (
    <>
      <h2>Latest Products</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error' >{ error }</Message>
      ) : (
        <Grid container spacing={1}>
          <Grid container item xs={10} spacing={3}>
            {products.map(product => (<Grid key={product._id} item xs={4}>
            <Paper><Product product={product}/></Paper></Grid>))}
          </Grid>
        </Grid>)}
    </>
  )
}

export default HomeScreen
