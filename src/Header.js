import React from 'react'
import { AppBar, Button, Toolbar, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import Login from './Login'
import User from './User'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  typography: {
    flex: 1,
    textTransform: 'capitalize',
    color: '#FFFFFF'
  },
  button: {
    textTransform: 'none',
    color: '#FFFFFF',
  }
}))

const Header = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const getUserInfo = (uid, cid, fName) => {
    props.setUser(uid, cid, fName)
  }

  return(
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant='h4' className={classes.typography}>
          <Button onClick={() => history.push('/')}>
            <Typography variant='h4' className={classes.typography}>
              Namazon Store
            </Typography>
          </Button>
        </Typography>
        {props.userFirstName ? 
          <User 
            userFirstName={props.userFirstName}
            setIsPaneOpen={props.setIsPaneOpen}
            endSession={props.endSession}
          /> : 
          <Login setUser={getUserInfo}/>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header