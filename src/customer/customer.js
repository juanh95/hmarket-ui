import React from 'react'
import axios from 'axios'
import Cart from './cart'
import RecentlyViewedContainer from './recentlyViewed'
import StoreContainer from '../store/store'
import SlidingPane from "react-sliding-pane"
import "react-sliding-pane/dist/react-sliding-pane.css"

export default class CustomerContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      cart: [],
      cartId: this.props.cartId,
      itemToAdd: {},
      userId: this.props.userId,
      total: 0,
      isPaneOpen: false
    }
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
    this.loadCartItemsFromRESTAPI = this.loadCartItemsFromRESTAPI.bind(this)
    this.showCart = this.showCart.bind(this)
  }

  async componentDidMount() {
    await this.loadCartItemsFromRESTAPI()
  }

  async handleRemoveFromCart(itemId){
    await axios.delete(`http://localhost:8080/cart/${this.state.cartId}/cartItem/${itemId}`)
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

  showCart() {
    this.setState({
      isPaneOpen: this.state.isPaneOpen ? false : true
    })
  }
    
  render() {
    return(
      <div>
        <section style={{display: 'table', width: '100%'}}>
          <div style={{display: 'table-cell'}}>
            <RecentlyViewedContainer/>
          </div>
          <div style={{display: 'table-cell'}}>
          <SlidingPane 
            isOpen={this.state.isPaneOpen}
            title="My Cart"
            subtitle={this.state.total}
            width="300px"
            onRequestClose={() => {
              this.setState({isPaneOpen: false})
            }}>  
              <Cart
                cart={this.state.cart}
                cartId={this.state.cartId}
                cartTotal={this.state.total}
                handleRemoveFromCart={this.handleRemoveFromCart}/>
            </SlidingPane>
            <button onClick={this.showCart}>
            Show Cart
            </button>
          </div>
        </section>
        <StoreContainer 
          isLoggedIn={this.props.isLoggedIn} 
          cartId={this.props.cartId} 
          loadCartItemsFromRESTAPI={this.loadCartItemsFromRESTAPI}
          showCart={this.showCart}/>
      </div>
    )
  }
}