import React ,{ useReducer } from 'react'
import authContext from './AuthContext'
import authReducer from './AuthReducer'
import axios from 'axios'
import SetAuthToken from '../../../utils/setAuthToken'
import { trackPromise,usePromiseTracker } from 'react-promise-tracker'

const url = ''

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated:null,
        loading:true,
        profile:{},
        error:null,
        res:null,
        visitor:{},
        fetching_user:true,
    }
const [state,dispatch] = useReducer(authReducer,initialState) 

const clearLoader = () => {
  dispatch({type:"CLEAR_LOADER"})
}

const loadProfile = async () => {
  //clearLoader()
  // load token to headers for auhtenticated routes
  if(localStorage.token) {
    SetAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get(`${url}/api/auth`)
    dispatch({
      type:"LOAD_PROFILE",
      payload:res.data
    })
  } catch (error) {
    //console.log(error.response)
    dispatch({
      type: "LOAD_PROFILE_ERROR",
      payload:error.response
    })
    setTimeout(() => {
      dispatch({type:"CLEAR_ERRORS"})
    },4000)
  }
 }
 const log_out = async () => {
  const res = await axios.get('/log-out')
   //console.log("logging out...")
  dispatch({
    type: "LOG_OUT",
    payload:res.data
  })
  
 }
 const loadVisitorProfile = async userId => {
  //clearLoader()
  // load token to headers for auhtenticated routes
  try {
    const res = await trackPromise(axios.get(`${url}/visitor-profile/${userId}`),"GETVISITOR")
    //console.log(res.data)
    dispatch({
      type:"LOAD_VISITOR_PROFILE",
      payload:res.data
    })
  } catch (error) {
    //console.log(error.response)
    dispatch({
      type: "LOAD_VISITOR_PROFILE_ERROR",
      payload:error.response
    })
    setTimeout(() => {
      dispatch({type:"CLEAR_ERRORS"})
    },4000)
  }
 }
// Add school
const register = async user => {
  
   try {
     const res = await trackPromise(axios.post(`${url}/register`,user),"REGISTER")
     dispatch({
       type:"REGISTER_SUCCES",
       payload:res.data
     })
     loadProfile()
   } catch (error) {
    //console.log(error)
    dispatch({
     
      type:"REGISTER_ERROR",
      payload:error.response
    })
    setTimeout(() => {
      dispatch({type:"CLEAR_ERRORS"})
    },4000)
   }

}
const login  = async user => {
  //console.log(user)
  try {
    
    const res = await trackPromise(axios.post(`${url}/login`,user),"LOGIN")
    dispatch({
      type:"LOGIN_SUCCES",
      payload:res.data
    })
    loadProfile()
  } catch (error) {
   dispatch({
     type:"LOGIN_ERROR",
     payload:error.response
   })
   setTimeout(() => {
    dispatch({type:"CLEAR_ERRORS"})
  },4000)
  }

}

const editProfile  = async (id,area,value) => {
  let field = {
    id:id,
    area:area,
    value:value
  }
  try {
    
    const res = await trackPromise(axios.post(`${url}/edit-profile`,field),"area")
    //console.log(res.data.msg)
    dispatch({
      type:"EDIT_USER_SUCCESS",
      payload:res.data
    })
    loadProfile()
  } catch (error) {
   dispatch({
     type:"EDIT_USER_ERROR",
     payload:error.response
   })
   setTimeout(() => {
    dispatch({type:"CLEAR_ERRORS"})
  },4000)
  }

}

// Load school 

const clearErrors = () => {
  dispatch({type:"CLEAR_ERRORS"})
}


return <authContext.Provider
value={{
    token:state.token,
    authenticated:state.authenticated,
    errors: state.error,
    register,
    profile:state.profile,
    clearErrors,
    loadProfile,
    login,
    clearLoader,
    usePromiseTracker,
    loading:state.loading,
    editProfile,
    response:state.res,
    loadVisitorProfile,
    visitor:state.visitor,
    fetching_user:state.fetching_user,
    log_out
}}
>
{props.children}
</authContext.Provider>
}

export default AuthState