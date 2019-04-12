export default (state = {
  visible: false,
  messageType: 'info',
  message: 'Default message'
}, action) => {
  switch (action.type) {
    case "SHOW_SNACKBAR":
      return {
        ...state,
        visible: true,
        messageType: action.messageType,
        message: action.message
      }

    case "HIDE_SNACKBAR":
      return {
        ...state,
        visible: false
      }
   
    default:
      return state
  }
}