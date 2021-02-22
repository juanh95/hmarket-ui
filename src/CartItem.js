import React, {useState} from 'react';
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import axios from 'axios'
import {
  CardActions,
  Card, 
  CardContent, 
  CardMedia, 
  makeStyles, 
  Typography, 
  Button
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: 12,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%',
    height: 'auto',
  },

}));

export default function CartItem(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false)

  const handleRemove = async(itemId) =>{
    try {
      setIsLoading(true)
      await axios.delete(`http://localhost:8080/cart/${props.cartId}/cartItem/${itemId}`)
      var response = await axios.get(`http://localhost:8080/user/${props.userId}/cart`)
      props.updateCart(response.data)

    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  }

  return (
    <LoadingMask loading={isLoading} text={"Removing"}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={props.imgurl}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="body2" variant="body1">
              {props.itemName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {props.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small" onClick={() => handleRemove(props.itemId) } >Remove</Button>
          </CardActions>
        </div>
      </Card>
    </LoadingMask>
  );
}
