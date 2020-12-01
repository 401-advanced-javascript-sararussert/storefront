import React from 'react';
import { Link as SiteLink } from 'react-router-dom';
import { Breadcrumbs, Link, Typography, Container } from '@material-ui/core';

const Header = () => {
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
        <SiteLink to="/login" className="linkStyle">
          <Link color="inherit"><i className='fas fa-user'></i>
          SIGN IN
          </Link>
        </SiteLink>
      </Breadcrumbs>
    </header>
  )
}

export default Header
