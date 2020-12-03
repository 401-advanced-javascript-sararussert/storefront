import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
  return (
    <div>
      <CircularProgress />
      <CircularProgress variant="indeterminate" color="secondary" />
    </div>
  )
}

export default Loader;


