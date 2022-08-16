
const initialState = {
    userLoginData: [],
    appNav: []
}
const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'userLoginData':
            return {
                ...state,
                userLoginData: action.data
            }
        case 'appNav':
            return {
                ...state,
                appNav: action.data
            }
        default:
            return state;
    }

}
export default dataReducer;