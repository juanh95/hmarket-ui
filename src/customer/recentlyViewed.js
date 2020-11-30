import React from 'react'
import axios from 'axios'
import ScrollArea from 'react-scrollbar'

export default class RecentViewContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            recentlyViewedItems: []
        }
    }

    async componentDidMount() {
        await this.loadRecentlyViewed()
    }

    async loadRecentlyViewed() {
        const loadResponse = await axios.get('http://localhost:8080/StoreItem/Recent?num=10')
        this.setState({
            recentlyViewedItems: loadResponse.data
        })
    }

    displayRecentlyViewed() {
        try {
            {this.state.recentlyViewedItems.map(item => {
                return (
                    <div>
                        <li style={{marginTop: '10px'}} key={item._id}>
                            {item.itemName} {item.price}
                        </li>
                    </div>
                )
            })}
        } catch (error) {
            return(<li>No Recently Viewed Items</li>)
        }
    }


    render(){
        return(
            <div>
                <h3 style={{marginLeft: '30px', marginBottom: '10px'}}>Recently Viewed Items</h3>
                <ScrollArea style={{height: '150px', width: '100%'}}>
                    <ul style={{listStyleType: "none"}}>
                        {this.displayRecentlyViewed()}
                    </ul>
                </ScrollArea>
            </div>
        )
    }
}