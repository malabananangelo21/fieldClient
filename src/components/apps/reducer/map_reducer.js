const initialState = {
    accomplishments_map: [],
    loading_map: false,
    coordinates: [],
    jo_type: [],
    selected_jo: [],
    accom_jo_type: [],
    accom_selected_jo: '',
    branch_field_details: [],
    selected_details: [],
    job_position: '',
    accom_branch_field_details: [],
    pin_img: [],
    branch_name: '',
    company_id: '',
    branch_id: '',
    logo: '',
    count_validation_logs: 0,
    route_data: [],
    refresh:false,
    selected_data:[],
    job_type_per_branch:[],
    refreshAccomDetails:false,
    selectedAccomIndex:'',
    refreshDailyAccom:false,
    closeGenerateModal:false
}
const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'accomplishments_map':
            return {
                ...state,
                accomplishments_map: action.data
            }
        case 'loading_map':
            return {
                ...state,
                loading_map: action.data
            }
        case 'coordinates':
            return {
                ...state,
                coordinates: action.data
            }
        case 'JobOrderType':
            return {
                ...state,
                jo_type: action.data,
                selected_jo: [action.data[0]]
            }
        case 'Branch_field_details':
            return {
                ...state,
                branch_field_details: action.data
            }
        case 'selected_details':
            return {
                ...state,
                selected_details: action.data
            }
        case 'branch_name':
            return {
                ...state,
                branch_name: action.data
            }
        case 'selected_filter':
            return {
                ...state,
                branch_id: action.branch_id,
                company_id: action.company_id
            }
        case 'job_position':
            return {
                ...state,
                job_position: action.data,
            }
        case 'pin_img':
            return {
                ...state,
                pin_img: action.pin_img
            }
        case 'count_validation_logs':
            return {
                ...state,
                count_validation_logs: action.data
            }
        case 'JobOrderType_position':
            return {
                ...state,
                jo_type: action.jo_type,
                selected_jo: action.jo_type_val,
                job_position: action.job_position,

            }
        case 'route_data':
            return {
                ...state,
                route_data: action.data
            }
        case "MapReducerState":
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}
export default dataReducer;