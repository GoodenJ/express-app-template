export default (state = {
  authenticationDetails:{
    username: '',
    password: '',
    role: ''
  }
}, action) => {
  switch (action.type) {
    case "UPDATE_LOGIN":
      return {
        ...state,
        authenticationDetails: { 
          ...state.authenticationDetails,
          ...action.value
        }
      }
   
    case "CLEAR_CREDENTIALS":
      return {
        ...state,
        authenticationDetails: {
            username: '',
            password: '',
            role: ''
        }
      }

    default:
      return state
  }
}