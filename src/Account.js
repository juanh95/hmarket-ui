import React, { useState } from 'react';
import Header from './Header'
import axios from 'axios'
import LoadingMask from "react-loadingmask";
import {
  Button, 
  CssBaseline, 
  Container,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [fName, setFirstName] = useState('')
  const [lName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [uName, setUserName] = useState('')
  const [pword, setPassword] = useState('')
  const [loadingFlag, setLoadingFlag] = useState(false)

  const classes = useStyles();

  const handleSubmit = async() => {
    const newUser = {
      firstName: fName,
      lastName: lName, 
      email: email,
      password: pword,
      username: uName,
    }

    try {
      setLoadingFlag(true)
      const response = await axios.post('http://localhost:8080/user', newUser)
      
      //Redirect to Main Page will happen here
      alert('got this far')
      console.log('something');
    } catch (error) {
      console.log(error);
    }

    setLoadingFlag(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Header />
      <CssBaseline />
      <LoadingMask loading={loadingFlag} text={"Creating Account..."}>
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={event => setFirstName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={event => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={event => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={event => setUserName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={event => setPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleSubmit()}
          >
            Sign Up
          </Button>
        </form>
      </div>
      </LoadingMask>
    </Container>
  );
}