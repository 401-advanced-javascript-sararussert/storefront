import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from './Rating';
import ProductScreen from '../screens/ProductScreen';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Product = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={`/product/${props.product._id}`}>
          <CardMedia
            className={classes.media}
            image={props.product.image}
            title={props.product.name}
          />
        </Link>
        <CardContent>
          <Link to={`/product/${props.product._id}`} className="linkStyle">
            <Typography gutterBottom variant="h5" component="h2">
              {props.product.name}
            </Typography>
          </Link>
          <Typography gutterBottom variant="p" component="p">
            <Rating 
              value={props.product.rating} 
              text={`${props.product.numReviews} reviews`} 
            />
          </Typography>
          <Typography gutterBottom variant="h5" component="p">
            ${props.product.price}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            {props.product.description}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  )
}

export default Product
