
  export default (state,action) => {
      switch (action.type) {
         
                case "WATCH":
                    return{
                        ...state,
                        watcher: state.watcher + action.payload
                    }
                    break;
                    case "FILTER":
                        const regex  = new RegExp(`${action.payload.filter}`,'gi')
                        return{
                            ...state,
                            filter: action.payload.method === "search" ? ( 
                                state.products.filter( item =>  {
                                    return item.name.match(regex)
                                })
                             ) :
                             state.products.filter( item =>  {
                                return item.category.match(regex)
                            }),
                            filtering:false
                        }
                        break;
                    case "LOGIN":
                        //console.log(action.payload)
                        return{
                            ...state,
                            authenticated: action.payload === "kochproperties.co.ke.12" ? true : false
                        }
                        break;
                  
                    case "GET_SUCC":
                        return{
                            ...state,
                            assets: action.payload
                        }
                        break;
                    case "GET_ERROR":
                        return{
                            ...state,
                            error:"We encountered an error refresh page again .."
                        }
                        break;
                        case "ADD_SUCC":
                            return{
                                ...state,
                                success:"product added"
                            }
                            break;
                        case "ADD_ERROR":
                            return{
                                ...state,
                                error:"We encountered an error refresh page again .."
                            }
                            break;
                            case "R_SUCC":
                                return{
                                    ...state,
                                    success:"product removed"
                                }
                                break;
                            case "R_ERROR":
                                return{
                                    ...state,
                                    error:"We encountered an error refresh page again .."
                                }
                                break;
                            case "CLEAR":
                            return{
                                ...state,
                                error:null,
                                success:null
                            }
                            break;
          default:
              return {
                  ...state
              }
      }
  }