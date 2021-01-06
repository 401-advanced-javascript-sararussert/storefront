import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  button: {
    marginTop: '10px',
    backgroundColor: 'black',
    color: 'white',
    width: 150,
  }
}));

const LoginScreen = ({location, history}) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  // having problems with this preventing ever reaching the login screen - prints []
  // useEffect(() => {
  //   if (userInfo) {
  //     console.log(userInfo);
  //     history.push(redirect);
  //   }
  // }, [history, userInfo, redirect])
  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <div>
        <form onSubmit={submitHandler}>
          <TextField 
            label="Email Address" 
            placeholder="Enter Email Address"
            fullWidth 
            onChange={(e) => setEmail(e.target.value)}/>       
          <TextField
            label="Password"
            placeholder="Enter Password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type='submit'
            variant="contained"
            className={classes.button} >Sign In</Button>
        </form>
      </div>
      <br />
      New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
    </FormContainer>
  )
}

export default LoginScreen;

