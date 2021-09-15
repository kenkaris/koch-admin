import React ,{ useReducer,useContext } from 'react'
import PropertyContext from './propetyContext'
import PropertyReducer from './PropertyReducer'
import axios from 'axios'
import { trackPromise,usePromiseTracker } from 'react-promise-tracker'
import { v4 as uuidv4 } from 'uuid';
const url = 'http://localhost:3001'
const PropertyState =props => {
    const initialState = {
    assets:[],
    error:null,
    watcher:0,
    success:null,
    bal:0,
    authenticated:false,
    filter:[],
    filtering:true
    
    }
const [state,dispatch] = useReducer(PropertyReducer,initialState) 
const clear = async () => {
  setTimeout(() => 
   dispatch({
     type:"CLEAR",
     payload:8
   })
  ,2000)
 }
const fetchProducts = async (item) => {
try {
  const res = await trackPromise(axios.get(`${url}/sendAssets`),"GET_PRODUCTS")
  dispatch({
    type:"GET_SUCC",
    payload:res.data.asset
  })
} catch (error) {
  dispatch({
    type:"GET_ERROR",
    payload:error.response
  })
  clear()
}
}
const addProduct = async data => {
 
  try {
    const res = await trackPromise(axios.post(`${url}/add-asset`,data),"ADDITEM")
    fetchProducts()
    console.log(res.data)
    dispatch({
      type:"ADD_SUCC",
      payload:res.data
    })
  } catch (error) {
    dispatch({
      type:"ADD_ERROR",
      payload:error.response
    })
    clear()
  }
  }
  const addProduct_f = async (data,category) => {
    
    try {
      const res = await trackPromise(axios.post(`${url}/add-asset-f`,data),"ADDITEMF")
      fetchProducts()
      //console.log(res.data)
      dispatch({
        type:"ADD_SUCC",
        payload:res.data
      })
    } catch (error) {
      dispatch({
        type:"ADD_ERROR",
        payload:error.response
      })
      clear()
    }
    }
    const addProduct_p = async (data,category) => {
      
      try {
        const res = await trackPromise(axios.post(`${url}/add-asset-p`,data),"ADDITEMP")
        fetchProducts()
        //console.log(res.data)
        dispatch({
          type:"ADD_SUCC",
          payload:res.data
        })
      } catch (error) {
        dispatch({
          type:"ADD_ERROR",
          payload:error.response
        })
        clear()
      }
      }
  const calc = async (price) => {
    dispatch({
      type:"BALANCE",
      payload:parseInt(price)
    })
  }
  const calc2 = async (price) => {
    dispatch({
      type:"BALANCE2",
      payload:parseInt(price)
    })
  }
// find school
const fetchProp = async (item) => {
  dispatch({
    type:"ADD_ITEM",
    payload:item
  })
  calc(item.price)
}
const filter_f =  (method,filter) => {
  console.log(method,filter)
  dispatch({
    type:"FILTER",
    payload:{ method,filter }
  })

}
const CLEAR_FILTER =  () => {
  dispatch({
    type:"C_FILTER"
  })

}
const removeCart = async item => {
  dispatch({
    type:"REMOVE_ITEM",
    payload:item
  })
  calc2(item.price)
}
const removeProp = async (id) => {
 
  try {
    const res = await trackPromise(axios.delete(`${url}/delete-asset/${id}`),"REMOVEITEM")
    fetchProducts()
    dispatch({
      type:"R_SUCC",
      payload:res.data
    })
  } catch (error) {
    dispatch({
      type:"R_ERROR",
      payload:error.response
    })
  }
}
const watch = async (item) => {
  dispatch({
    type:"WATCH",
    payload:8
  })
}
const login = async  pwd => {
  console.log(pwd)
  dispatch({
    type:"LOGIN",
    payload:pwd
  })
}


return <PropertyContext.Provider
value={{
  fetchProducts,
  assets:state.assets,
  addProduct,
  removeCart,
  fetchProp,
  removeProp,
  cart: state.cart,
  error:state.error,
  success:state.success,
  usePromiseTracker,
  watcher:state.watcher,
  clear,
  calc,
  balance:state.bal,
  authenticated:state.authenticated,
  login,
  filter_f,
  filter:state.filter,
  filtering:state.filtering,
  CLEAR_FILTER,
  addProduct_f,
  addProduct_p
}}
>
{props.children}
</PropertyContext.Provider>
}

export default PropertyState