import React, {useState} from 'react'
import axios from 'axios'
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import { Link } from 'react-router-dom'
import{
  Button,
  TextField, 
  Dialog,
  DialogActions, 
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

const Login = (props) => {
  const [uName, setUserName] = useState('')
  const [pWord, setPassword] = useState('')
  const [open, setOpen] = React.useState(false);
  const [loadingFlag, setLoadingFlag] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    setLoadingFlag(true)

    const loginBody = {
      username: uName,
      password: pWord
    }
    
    try {
      var response = await axios.post('http://localhost:8080/user/login', loginBody)
      props.setUser(response.data.userId, response.data.cartId, response.data.firstName)
    } catch (error) {
      alert("Invalid Username and Password Combination")
    }
    setLoadingFlag(false)
  }

  return(
    <div>
      <Button variant='contained' onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <LoadingMask loading={loadingFlag} text={"Logging In..."}>
            <DialogContentText>
              Please enter your username and password in the boxes below. Or
            </DialogContentText>
            <DialogContentText style={{marginTop: '-15px'}}>
              <Link to="/register">Create An Account</Link>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="username"
              fullWidth
              onChange={event => setUserName(event.target.value)}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={event => setPassword(event.target.value)}
            />
          </LoadingMask>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Login

