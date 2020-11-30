import React from 'react'
import axios from 'axios'
import ScrollArea from 'react-scrollbar'

export default class StoreContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      storeItems: [],
      sortStatus: '',
      searchQuery: ''
    }
    this.handleToggleSort = this.handleToggleSort.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleSearchOnChange = this.handleSearchOnChange.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  async componentDidMount() {
    if(this.state.storeItems.length === 0){
      await this.loadStoreItemsFromRESTAPI()
    }
  }

  async loadStoreItemsFromRESTAPI() {
    const storeItemsResponse = await axios.get('http://localhost:8080/StoreItem')
    this.setState({
      storeItems: storeItemsResponse.data
    })
  }

  handleToggleSort() {
    switch(this.state.sortStatus){
      case '': 
        var tempStoreItems = this.state.storeItems

        tempStoreItems.sort(function(a,b) {
          var itemA = a.itemName.toString().toLowerCase()
          var itemB = b.itemName.toString().toLowerCase()

          if(itemA < itemB){ return -1 }
          if(itemA > itemB){ return 1 }
          return 0
        })
        
        this.setState({
          storeItems: tempStoreItems,
          sortStatus: 'z-a'
        })
        break
        
        default:
          if(this.state.sortStatus === 'z-a'){
            this.setState({
              storeItems: this.state.storeItems.reverse(),
              sortStatus: 'a-z'
            })
          } else{
            this.setState({
              storeItems: this.state.storeItems.reverse(),
              sortStatus: 'z-a'
            })
          }
          break
    }
  }

  async handleSearchSubmit(event) {
    event.preventDefault()
    const searchResponse = await axios.get(`http://localhost:8080/StoreItem?itemName=${this.state.searchQuery}`)
    this.setState({storeItems: searchResponse.data})
  }

  handleSearchOnChange(event) {
    this.setState({searchQuery: event.target.value})
  }

  async handleAddToCart(itemId){
    const updatedCart = await axios.post(`http://localhost:8080/cart/${this.props.cartId}/cartItem/${itemId}`)
    await this.props.loadCartItemsFromRESTAPI()
  }

  render(){
    return(
      <div>
        <button style={{marginLeft: '30px'}} onClick={this.handleToggleSort}>Sort {this.state.sortStatus}</button>
        <form onSubmit={this.handleSearchSubmit}>
          <input type='text' name='search' placeholder='Search for...' value={this.state.searchQuery} onChange={this.handleSearchOnChange} />
          <input type='submit' value='search store' />
        </form>
        <ScrollArea style={{height: '300px', width: '100%'}}>
          <ul style={{listStyleType: "none"}}>
            {this.state.storeItems.map(item => {
              return (
                <div>
                  <li style={{marginTop: '10px'}} key={item._id}>
                    {item.itemName} {item.price}
                  </li>
                  {this.props.isLoggedIn ? 
                    <button onClick={() => {this.handleAddToCart(item._id)}}>
                    Add {item.itemName} to cart
                    </button>
                    : 
                    null
                  }
                </div>
              )
            })}
          </ul>
        </ScrollArea>
      </div>
    )
  }
}