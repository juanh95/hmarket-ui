import React from 'react'
import axios from 'axios'
import CartContainer from './cart'
import RecentlyViewedContainer from './recentlyViewed'
import StoreContainer from '../store/store'

export default class CustomerContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      cart: [],
      cartId: this.props.cartId,
      itemToAdd: {},
      userId: this.props.userId,
      total: 0
    }
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
    this.loadCartItemsFromRESTAPI = this.loadCartItemsFromRESTAPI.bind(this)
  }

  async componentDidMount() {
    await this.loadCartItemsFromRESTAPI()
  }

  async handleRemoveFromCart(itemId){
    const updatedCart = await axios.delete(`http://localhost:8080/cart/${this.state.cartId}/cartItem/${itemId}`)
    await this.loadCartItemsFromRESTAPI()
  }

  async loadCartItemsFromRESTAPI() {
    var tempTotal = 0
    
    const cartItemsResponse = await axios.get(`http://localhost:8080/user/${this.state.userId}/cart`)
    
    if(cartItemsResponse.data.length !== 0){
      cartItemsResponse.data.forEach(x => {
        tempTotal += parseFloat(x.price)
      });
    }

    this.setState({
      cart: cartItemsResponse.data,
      total: tempTotal.toFixed(2)
    })
  }
    
  render() {
    return(
      <div>
        <section style={{display: 'table', width: '100%'}}>
          {/* the left side of the section 'recently viewed' goes here*/}
          <div style={{display: 'table-cell'}}>
            <RecentlyViewedContainer/>
          </div>
          {/* the right side of the section 'cart' goes here*/}
          <div style={{display: 'table-cell'}}>
            <CartContainer 
              cart={this.state.cart}
              cartId={this.state.cartId}
              cartTotal={this.state.total}
              handleRemoveFromCart={this.handleRemoveFromCart}
            />
          </div>
        </section>
        <StoreContainer isLoggedIn={this.props.isLoggedIn} cartId={this.props.cartId} loadCartItemsFromRESTAPI={this.loadCartItemsFromRESTAPI}/>
      </div>
    )
  }
}