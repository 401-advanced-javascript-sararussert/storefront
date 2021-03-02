import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper1: {
    height: 800,
    width: 350,
    padding: theme.spacing(2),
  },
  paper2: {
    height: 800,
    width: 800,
    padding: theme.spacing(2),
  }
}));

const ProfileScreen = ({location, history}) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if(!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success])
  
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name: name, email: email, password: password }))
    }
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="left">
          <Grid key='profile' item xs={4}>
            <Paper className={classes.paper1}><h1>User Profile</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile 
      Updated</Message>}
      {loading && <Loader />}
      <div>
        <form onSubmit={submitHandler}>
        <TextField 
            label={name} 
            placeholder="Enter Name"
            fullWidth 
            onChange={(e) => setName(e.target.value)}/>  
          <TextField 
            label={email} 
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
            className={classes.button} >Update</Button>
        </form>
      </div></Paper>
          </Grid>
          <Grid key='orders' item xs={8}>
            <Paper className={classes.paper2}><h1>Orders</h1></Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileScreen;



