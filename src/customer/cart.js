import React from 'react'
import ScrollArea from 'react-scrollbar'

function Cart(props) {
  return(
    <ScrollArea 
      style={{ height: '70%' }}>
      <ul style={{listStyleType: "none"}}>
        {props.cart.map(item => {
          return (
            <div style={{
              display: 'list-item',
              justifyContent: 'center', 
              alignItems: 'center'
            }}>
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
  )
}

export default Cart