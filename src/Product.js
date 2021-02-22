import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { CardMedia } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 'auto',
    width: '100%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

const Product = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false)
  };

  const handleAddToCart = async() =>{
    if(props.cartId){
      try {
        await axios.post(`http://localhost:8080/cart/${props.cartId}/cartItem/${props.itemId}`)
      } catch (error) {
        console.log(error);
      }
      //this will be a separate issue
      props.openPane()
    } else {
      setOpen(true)
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please Sign In to Add Items to Your Cart"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Card className={classes.root}>
        <CardMedia className={classes.media} style={{ height: "150px" }} image={props.imgurl} />
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.itemName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.price}
          </Typography>
          <Typography variant="body2" component="p">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleAddToCart()}>Add To Cart</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Product