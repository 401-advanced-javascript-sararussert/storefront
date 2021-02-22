import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  button: {
    marginTop: '10px',
    backgroundColor: 'black',
    color: 'white',
    width: 150,
  }
}));

const RegisterScreen = ({location, history}) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect])
  
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <div>
        <form onSubmit={submitHandler}>
        <TextField 
            label="Name" 
            placeholder="Enter Name"
            fullWidth 
            onChange={(e) => setName(e.target.value)}/>  
          <TextField 
            label="Email Address" 
            placeholder="Enter Email Address"
            fullWidth 
            onChange={(e) => setEmail(e.target.value)}/>       
          <TextField
            label="Password"
            placeholder="Enter Password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}/>
            <TextField
            label="Confirm Password"
            placeholder="Confirm Password"
            fullWidth
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button 
            type='submit'
            variant="contained"
            className={classes.button} >Register</Button>
        </form>
      </div>
      <br />
      Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
    </FormContainer>
  )
}

export default RegisterScreen;