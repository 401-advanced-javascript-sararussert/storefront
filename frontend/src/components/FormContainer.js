import React from 'react';
import { Container } from '@material-ui/core';

const FormContainer = ({children}) => {
  return (
    <Container maxWidth="sm">
      {children}
    </Container>
  )
}

export default FormContainer

