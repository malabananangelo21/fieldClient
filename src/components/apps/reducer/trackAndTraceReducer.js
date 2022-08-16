const initialState = {
    selectedBranch:[],
    selectedJobOrder:'',
    joList:[],
    referenceNumber:'',
    trackList:[],
    selectedAccom:[],
    branchFieldDtails:[],
    initialFields:[]

}
const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'onChangeTrackAndTrace':
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}
export default dataReducer;