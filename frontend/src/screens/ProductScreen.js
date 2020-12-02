import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
import Rating from '../components/Rating';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 800,
    height: 500,
  },
  rootAction: {
    display: 'flex',
    width: 180,
    height: 180,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 3000,
  },
  button: {
    margin: '10px',
    backgroundColor: 'black',
    color: 'white',
  },
  typography: {
    marginTop: '10px',
  }
  

}));

const ProductScreen = ({ match }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data)
    }
    fetchProduct();
  }, []);

  return (
    <div className="productScreen">
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={product.image}
          title={product.name}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography gutterBottom component="h5" variant="h5">
              {product.name}
            </Typography>
            <Typography className={classes.typography} gutterBottom variant="subtitle2">
              <Rating 
                value={product.rating} 
                text={`${product.numReviews} reviews`} 
              />
            </Typography>
            <Typography className={classes.typography} gutterBottom variant="h6">
              Price: ${product.price}
            </Typography>
            <Divider light />
            <Typography className={classes.typography} variant="body1" color="textSecondary">
            {product.description}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <Card className={classes.rootAction}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography className={classes.typography} gutterBottom variant="body1" color="textSecondary" component="p">
              Price: ${product.price}
              <Divider light />
            </Typography>
            <Typography className={classes.typography} gutterBottom variant="body1" color="textSecondary" component="p">
              Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              <Divider light />
            </Typography>
            <Button className={classes.button} variant="contained" disabled={product.countInStock === 0}>
              Add to Cart
            </Button>
          </CardContent>
        </div>
      </Card>
      {/* <Link to='/'>Go Back</Link> */}
    </div>
  )
}

export default ProductScreen;
