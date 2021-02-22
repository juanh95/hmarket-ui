import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import './App.css';
import Header from './Header'
import Cookies from 'js-cookie'
import Content from './Content'
import SlidingPane from "react-sliding-pane"
import "react-sliding-pane/dist/react-sliding-pane.css"
import Cart from './customer/Cart'
import config from './config'
import Cryptr from 'cryptr'

const cryptr = new Cryptr(config.cookieSecret)

const useStyles = makeStyles({
  content: {
    paddingTop: '3%'
  }
})

const Home = () => {
  const [userId, setUserId] = useState('')
  const [cartId, setCartId] = useState('')
  const [userFirstName, setUserFirstName] = useState('')
  const [isPaneOpen, setIsPaneOpen] = useState(false)
  
  const classes = useStyles()

  useEffect(() => {
    try {
      var session = JSON.parse(cryptr.decrypt(Cookies.get('sessionState')))
      if(session){
        setUserId(session.userId)
        setCartId(session.cartId)
        setUserFirstName(session.userFirstName)
      } 
    } catch (error) {
      console.log("No session data");
    }
  }, [])

  const initSession = (uid, cid, fName) => {
    setUserId(uid)
    setCartId(cid)
    setUserFirstName(fName)

    const sessionState = {
      userId: uid,
      cartId: cid,
      userFirstName: fName
    }

    const encryptedSession = cryptr.encrypt(sessionState)

    Cookies.set('sessionState', encryptedSession)
  }
  
  const endSession = () => {
    setUserId('')
    setCartId('')
    setUserFirstName('')
    Cookies.remove('sessionState')
  }

  const openPane = () => {
    setIsPaneOpen(true)
  }

  return(
    <Grid container direction='column'>
      <Grid item>
        <Header 
          setUser={initSession} 
          userFirstName={userFirstName} 
          setIsPaneOpen={setIsPaneOpen}
          endSession={endSession} 
        />
      </Grid>
      <Grid item container className={classes.content}>
        <Grid item xs={0} sm={2} />
        <Grid item xs={12} sm={8}>
          <Content 
            cartId={cartId}
            userId={userId}
            openPane={openPane}
          />
        </Grid>
        <Grid item>
          <SlidingPane 
            isOpen={isPaneOpen}
            title="My Cart"
            width="400px"
            onRequestClose={() => {
              setIsPaneOpen(false)
            }}>  
            <Cart 
              userId={userId} 
              cartId={cartId}
            />
          </SlidingPane>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home;
