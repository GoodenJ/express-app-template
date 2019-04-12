export default (state = {}, action) => {
    switch (action.type) {
        case "LOAD_START":
            return {
                ...state,
                [action.name]: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    data: undefined
                }
            }
        case "LOAD_END":
            return {
                ...state,
                [action.name]: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: action.response
                }

            }
        case "LOAD_FAILURE":
            return {
                ...state,
                [action.name]: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    data: action.response
                }
            }
        case "LOGOUT":
            return {
                ...state,
                AUTHENTICATION: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: {}
                }
            }
        default:
            return state
    }
}