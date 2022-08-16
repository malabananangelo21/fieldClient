const initialState = {
    accomplishments: [],
}
const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'accomplishments':
            return {
                ...state,
                accomplishments: action.data
            }
        default:
            return state;
    }
}
export default dataReducer; 