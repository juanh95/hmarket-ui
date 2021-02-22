import React, {useState, useEffect} from 'react'
import { Grid } from '@material-ui/core'
import Product from './Product'
import { makeStyles } from '@material-ui/styles'
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import axios from 'axios'
import Cookies from 'js-cookie'

const useStyles = makeStyles(() => ({
  gridSpacing: {
    paddingTop: '10px',
  },
}))

const Content = (props) => {
  const classes = useStyles()
  const [storeItems, setStoreItems] = useState([])
  const [loadingFlag, setLoadingFlag] = useState(false)

  useEffect(() => {
    async function getStore(){
      setLoadingFlag(true)
      const storeData = Cookies.get('storeData')
      
      if(storeData){
        setStoreItems(storeData)
      }else {
        const response = await axios.get('http://localhost:8080/StoreItem')
        Cookies.set('storeData', response.data)
        setStoreItems(response.data)
      }
      setLoadingFlag(false)
    }

    getStore();
  }, [])

  return(
    <LoadingMask loading={loadingFlag}>
      <Grid className={classes.gridSpacing} container spacing={3}>
        {storeItems.map(item => {
          return(
            <Grid item xs={4}>
              <Product 
                itemName={item.itemName} 
                price={item.price}
                imgurl={item.imgurl}
                itemId={item._id}
                cartId={props.cartId}
                openPane={props.openPane}
              />
            </Grid>
          )
        })}
      </Grid>
    </LoadingMask>
  )
}

export default Content