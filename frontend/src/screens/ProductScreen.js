import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails} from '../actions/productActions';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 800,
    height: 500,
  },
  rootAction: {
    display: 'flex',
    width: 180,
    height: 230,
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  typography: {
    marginTop: '10px',
  }
  

}));

const ProductScreen = ({ history, match }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [qty, setQty] = useState(1)
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error' >{ error }</Message>
      ) : (
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
                {product.countInStock > 0 && (
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Qty</InputLabel>
                    <Select
                      native
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      inputProps={{
                        name: 'Qty',
                        id: 'qty-native-simple',
                      }}
                    > 
                      {[...Array(product.countInStock).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <Button 
                  className={classes.button} 
                  variant="contained" 
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}>
                  Add to Cart
                </Button>
              </CardContent>
            </div>
          </Card>
          {/* <Link to='/'>Go Back</Link> */}
        </div> )}
    </>
  )
}

export default ProductScreen;
