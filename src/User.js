import React, {useState} from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Typography, IconButton, Toolbar, Button, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
    color: '#FFFFFF'
  }
})

const User = (props) => {
  const classes = useStyles()
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    props.endSession()
    handleClose()
  }

  return(
    <Toolbar>
      <Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Typography variant='h5'>Welcome {props.userFirstName}</Typography>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
      </Menu>
      <Tooltip title="View Cart" arrow>
        <IconButton>
          <ShoppingCartIcon 
            style={{marginLeft:10, fill:'white'}} 
            onClick={() => {props.setIsPaneOpen(true)}} />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}

export default User

