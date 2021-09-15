import React ,{ useReducer } from 'react'
import alertContext from './alertContext'
import alertReducer from './alertReducer'
import { v4 as uuidv4 } from 'uuid/dist';
import {
SET_ALERT,REMOVE_ALERT
}from '../types'

const AlertState = props => {
const initialState = {
    alert:[],
    showMoadal:false
}

const [state,dispatch] = useReducer(alertReducer,initialState) 
//set alert
const setAlert = (msg,type ,timeOut) => {
   const id = uuidv4()
   dispatch({
       type: SET_ALERT,
       payload:{msg,type,id}
   })
   setTimeout(() => dispatch({type: REMOVE_ALERT,payload: id}),timeOut)
}
const clearAlert = id => {
dispatch({type: REMOVE_ALERT,payload: id})
}
return <alertContext.Provider
value={{
 alerts:state.alert,
 showModal:state.showMoadal,
 setAlert,
 clearAlert
}}
>
{props.children}
</alertContext.Provider>
}

export default AlertState