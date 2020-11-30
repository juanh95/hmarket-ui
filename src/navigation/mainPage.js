import React from 'react'
import CustomerContainer from '../customer/customer'
import LoginContainer from '../navigation/login'
import StoreContainer from '../store/store'

export default class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      userId: '',
      cartId: '',
      jwt: '',
      isLoggedIn: false 
    }
    this.setUser = this.setUser.bind(this)
  }
  
  async setUser(uid, token, cid){
    this.setState({
      userId: uid,
      jwt: token,
      cartId: cid,
      isLoggedIn: true
    })
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