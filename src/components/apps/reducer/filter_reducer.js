const initialState = {
    selected_branches:[],
    jo_type:[],
    selected_branch_id:'',
    selected_company_id:'',
    date_start:'',
    date_end:'',
    selected_job_order:'',
    selected_jo:[],
    selectedMonth:'',
    selectedYear:''
}
const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'onChangeFilterData':
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}
export default dataReducer;