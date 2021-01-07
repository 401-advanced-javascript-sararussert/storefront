import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as SiteLink } from 'react-router-dom';
import { Breadcrumbs, Link, Typography, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logout } from '../actions/userActions';


const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    setAnchorEl(null);
  }, [userInfo])

  return (
    <header >
      <SiteLink to="/" className="linkStyle">
        <Typography align="left" variant="h5" color="textPrimary" >
          VIRTUAL STORE
        </Typography>
      </SiteLink>
      <Breadcrumbs aria-label="breadcrumb">
        <SiteLink to="/cart" className="linkStyle">
          <Link color="inherit"><i className='fas fa-shopping-cart'></i>
          CART
          </Link>
        </SiteLink>
        {userInfo? (
          <div>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            {userInfo.name}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <SiteLink to="/profile" className="linkStyle"><MenuItem onClick={handleClose}>Profile</MenuItem></SiteLink>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </Menu>
        </div>
        ) : <SiteLink to="/login" className="linkStyle">
        <Link color="inherit"><i className='fas fa-user'></i>
        SIGN IN
        </Link>
      </SiteLink>}
      </Breadcrumbs>
    </header>
  )
}

export default Header
