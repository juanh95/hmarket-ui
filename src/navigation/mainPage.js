import React from 'react'
import CustomerContainer from '../customer/customer'
import LoginContainer from '../navigation/login'
import StoreContainer from '../store/store'
import Cookies from 'js-cookie'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'

export default class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      userId: '',
      cartId: '',
      isLoggedIn: false 
    }
    this.setUser = this.setUser.bind(this)
  }
  
  async setUser(uid, cid){
    this.setState({
      userId: uid,
      cartId: cid,
      isLoggedIn: true
    })
    Cookies.set('sessionState', this.state)
  }

  componentDidMount() {
    try {
      var session = JSON.parse(Cookies.get('sessionState'))
      if(session){
        this.setState({
          userId: session.userId,
          cartId: session.cartId, 
          isLoggedIn: session.isLoggedIn
        })
      } 
    } catch (error) {
      console.log("No session data");
    }
  }

  render(){
    return(
      <div>
        <AppBar position='static'>
          <ToolBar>
          <InputBase
            placeholder="Search Products…"
            inputProps={{ 'aria-label': 'search' }}
          />
          </ToolBar>
          
          <Typography variant='h4' align='center'>
            Namazon Store
          </Typography>
        </AppBar>
        {this.state.isLoggedIn ? 
        <CustomerContainer 
          userId={this.state.userId} 
          cartId={this.state.cartId} 
          isLoggedIn={this.state.isLoggedIn}/> : <LoginContainer setUser={this.setUser}/>}
        {this.state.isLoggedIn ? null : 
          <Container maxWidth='xs'>
            <StoreContainer isLoggedIn={this.state.isLoggedIn}/>
          </Container>
        }  
      </div>
    )
  }    

}