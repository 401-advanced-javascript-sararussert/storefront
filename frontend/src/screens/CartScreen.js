import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
    maxWidth: 1000,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
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
  typography: {
    marginTop: '10px',
  }
}));


const CartScreen = ({ match, location, history }) => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

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
          <div className="cartScreen">
            <List>
              <Grid item xs='auto' md='auto' lg='auto'>
                <Typography variant="h6" className={classes.title}>
                  In your cart
                </Typography>
                <div className={classes.demo}>
                  <List dense={dense}>
                    {cartItems.map(item => (
                      <div>
                        <ListItem key={item.product}>
                          <ListItemAvatar>
                            <Avatar alt={item.name} src={item.image} className={classes.large}/>
                          </ListItemAvatar>
                          <Link to={`/product/${item.product}`}>
                            <ListItemText
                            inset
                            primary={item.name}
                            />
                          </ Link>
                          <ListItemText
                            inset
                            primary={`$${item.price}`}
                          />
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
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" 
                              onClick={() => removeFromCartHandler(item.product)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider light />
                      </div>
                    ))}
                  </List>
                </div>
              </Grid>
            </List>
            <Card className={classes.rootAction}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography className={classes.typography} gutterBottom variant="body1" color="textSecondary" component="p">
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                    <Divider light />
                  </Typography>
                  <Typography className={classes.typography} gutterBottom variant="body1" color="textSecondary" component="p">
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    <Divider light />
                  </Typography>
                  <Button 
                    className={classes.button} 
                    variant="contained" 
                    onClick={checkoutHandler}>
                      Proceed to Checkout
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div> 
        )}
                             
    </div>
  )
}

export default CartScreen;
