import React from 'react'
import ScrollArea from 'react-scrollbar'

export default class CartContainer extends React.Component{
  constructor(props){
    super(props)
  }
  
  render() {
    return(
      <div>
          <h3 style={{marginLeft: '30px', marginBottom: '10px'}}>Your Cart</h3>
          <ScrollArea style={{height: '150px', width: '100%'}}>
            <ul style={{listStyleType: "none"}}>
              {this.props.cart.map(item => {
                return (
                  <div>
                    <li style={{marginTop: '10px'}} key={item._id}>
                      {item.itemName} {item.price}
                    </li>
                    <button onClick={() => {this.props.handleRemoveFromCart(item._id)}}>
                      Remove {item.itemName} from cart
                    </button>
                  </div>
                )
              })}
            </ul>
          </ScrollArea>
          <h3 style={{marginLeft: '30px'}}>Total: {this.props.cartTotal}</h3>
      </div>
    )
  }
}