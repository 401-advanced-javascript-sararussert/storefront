import React from 'react';
import { Alert } from '@material-ui/lab';

const Message = ({ severity, children }) => {
  return (
    <Alert variant="outlined" severity={severity}>
      {children }
    </Alert>
  )
}

Message.defaultProps = {
  severity: 'info'
}

export default Message
