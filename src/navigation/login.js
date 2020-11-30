import React from 'react'
import axios from 'axios'

export default class LoginContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }

    this.loginEventHandler = this.loginEventHandler.bind(this)
    this.handleUsernameInputOnChange = this.handleUsernameInputOnChange.bind(this)
    this.handlePasswordInputOnChange = this.handlePasswordInputOnChange.bind(this)
  }

  async loginEventHandler(){
    const loginBody = {
      username: this.state.username,
      password: this.state.password
    }

    var response

    try {
      response = await axios.post('http://localhost:8080/user/login', loginBody)
    } catch (e) {
      alert('Invalid Username and password combination')
    }

    this.props.setUser(response.data.userId, response.data.jwt, response.data.cartId)
  }

  handleUsernameInputOnChange(event) {
    this.setState({ username: event.target.value })
  }

  handlePasswordInputOnChange(event) {
    this.setState({ password: event.target.value })
  }

  render(){
    return(
      <div>
        <h3>Log In to View Cart And Recently Viewed</h3>
        <input placeholder='Username' value={this.state.username} onChange={this.handleUsernameInputOnChange}></input>
        <input type='password' placeholder='Password' value={this.state.password} onChange={this.handlePasswordInputOnChange}></input>
        <button onClick={this.loginEventHandler}>Login</button>
      </div>
    )
  }
}