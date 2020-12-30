import React from 'react'
import CustomerContainer from '../customer/customer'
import LoginContainer from '../navigation/login'
import StoreContainer from '../store/store'
import Cookies from 'js-cookie'

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
    var session = JSON.parse(Cookies.get('sessionState'))
    if(session){
      this.setState({
        userId: session.userId,
        cartId: session.cartId, 
        isLoggedIn: session.isLoggedIn
      })
    } 
  }

  render(){
    return(
      <div>
        <h1>Namazon Store</h1>
        {this.state.isLoggedIn ? 
        <CustomerContainer 
          userId={this.state.userId} 
          cartId={this.state.cartId} 
          isLoggedIn={this.state.isLoggedIn}/> : <LoginContainer setUser={this.setUser}/>}
        {this.state.isLoggedIn ? null : <StoreContainer isLoggedIn={this.state.isLoggedIn}/>}
      </div>
    )
  }    

}