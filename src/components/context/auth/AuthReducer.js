
export default (state ,action ) => {
    switch (action.type) {
        case "LOAD_PROFILE":
            return{
                ...state,
                profile:action.payload,
                loading:false,
                authenticated:true
               
            }
        case "REGISTER_SUCCES":
          case  "LOGIN_SUCCES":
           localStorage.setItem('token',action.payload.msg)
           return{
               ...state,
               ...action.payload,
               authenticated:true,

           }
        case "REGISTER_ERROR":
            case "LOAD_PROFILE_ERROR":
                case "LOGIN_ERROR":
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                authenticated:null,
                profile:null,
                error: ( action.payload ? ( action.payload.status === 500 ? "Sorry we can't reach our servers check your internet connection " : action.payload.data.msg ): "Sorry we can't reach our servers check your internet connection " )
            }
        case "CLEAR_ERRORS":
            return{
                ...state,
                error: null,
                res: null
            }
            case "EDIT_USER_SUCCESS":
                case "EDIT_USER_ERROR":
                return{
                    ...state,
                    error: action.payload.msg
                }
            case "CLEAR_LOADER":
                return{
                    ...state,
                    loading:true
                } 
            case "LOAD_VISITOR_PROFILE":
                return{
                    ...state,
                    visitor: action.payload,
                    fetching_user:false
                }
            case "LOAD_VISITOR_PROFILE_ERROR":
                return{
                    ...state,
                    visitor: {},
                    error:action.payload.msg,
                    fetching_user:false
                }
            case "LOG_OUT":
                    return{
                        token:null,
                        authenticated:false,
                        profile:null,
                        error: null
                    }
        default:
            return state
    }
}