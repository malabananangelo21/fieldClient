const initialState = {
    dateStart: new Date(),
    dateEnd: new Date(),
    companyId:'',
    joType:[],
    parameter:'',
    selection:[]        

}
const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'onChangeTrackAccomDate':
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}
export default dataReducer; 