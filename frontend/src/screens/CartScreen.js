import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justify: 'space-between'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  button: {
    margin: '10px',
    backgroundColor: 'black',
    color: 'white',
    width: 200,
  },
  paper: {
    padding: theme.spacing(1),
    maxWidth: 1000,
  },
}));


const CartScreen = ({ match, location, history }) => {
  const classes = useStyles();

  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  return (
    <div>
      <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
        <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
        ) : (
          <div className='cartScreen'>
            <Paper className={classes.paper}>
              <Grid container item>
                {cartItems.map(item => (
                  <Grid container spacing={5}>
                    <Grid item xs={1}>
                      <Avatar alt={item.name} src={item.image} className={classes.large}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Link to={`/product/${item.product}`} className="linkStyle">
                        <Typography gutterBottom variant="h5">{item.name}</Typography>
                      </ Link>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1">${item.price}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel htmlFor="age-native-simple">Qty</InputLabel>
                      <Select
                        native
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                        inputProps={{
                          name: 'Qty',
                          id: 'qty-native-simple',
                        }}
                      > 
                        {[...Array(item.countInStock).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>{num + 1}</option>
                        ))}
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={1}>
                      <IconButton edge="end" aria-label="delete" 
                        onClick={() => removeFromCartHandler(item.product)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography className={classes.typography} gutterBottom variant="h6" color="textSecondary" >
                      Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                      <Divider light />
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.typography} gutterBottom variant="body1" color="textSecondary" >
                      ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                      <Divider light />
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button 
                      className={classes.button} 
                      variant="contained" 
                      onClick={checkoutHandler}>
                        Proceed to Checkout
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div> 
        )}
                             
    </div>
  )
}

export default CartScreen;


