import React, { useState, useEffect } from 'react'
import ScrollArea from 'react-scrollbar'
import axios from 'axios'
import CartItem from '../CartItem'

function Cart(props) {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  
  useEffect(() => {
    async function getCart(){
      try {
        var tempTotal = 0
        const response = await axios.get(`http://localhost:8080/user/${props.userId}/cart`)
        setCart(response.data)
        
        response.data.forEach(x => {
          tempTotal =+ parseFloat(x.price)
        })

        setTotal(tempTotal.toFixed(2))

        console.log("Cart Loaded");
      } catch (error) {
        console.log(`Cart not loaded for user: ${props.userId}`);
      }
    }

    getCart()
  }, [])

  const updateCart = (cartData) => {setCart(cartData)} 

  return(
    <ScrollArea
      style={{ height: 'auto' }}>
      <ul style={{listStyleType: "none"}}>
        {cart.map(item => {
          return (
            <CartItem 
              imgurl={item.imgurl}
              itemName={item.itemName}
              price={item.price}
              itemId={item._id}
              cartId={props.cartId}
              userId={props.userId}
              handleRemoveFromCart={updateCart}
            />
          )
        })}
      </ul>
    </ScrollArea>
  )
}

export default Cart