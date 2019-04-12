export const showSnackbar = (messageType, message) => ({
    type: 'SHOW_SNACKBAR',
    messageType,
    message
});

export const hideSnackbar = () => ({
    type: 'HIDE_SNACKBAR'
});