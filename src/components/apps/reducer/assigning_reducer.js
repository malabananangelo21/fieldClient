import { Business } from "@material-ui/icons";

const initialState = {
  job_order_to_be_assign: [],
  fieldman_list: [],
  jo_assign: [],
  assign_branch_id: "",
  assign_company_id: "",
  jo_type: "",
  date_filter: new Date(),
  assigned_fieldman: [],
  jo_accounts: [],
  jo_unassign:[],
  mru:'',
  user_id:'',
  type:'',
  template_status:'',
  ba:[],
  jo_type_array:[]
};
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "job_order_to_be_assign":
      return {
        ...state,
        job_order_to_be_assign: action.data,
        fieldman_list: action.fieldman_list,
        assign_company_id: action.filterCompanyID,
        jo_type: action.joType,
        date_filter: action.date_filter,
        assigned_fieldman: action.assigned_fieldman,
        assign_branch_id: action.branch,
      };
    case "fieldman_list":
      return {
        ...state,
        fieldman_list: action.data,
      };
    case "filterCompanyID":
      return {
        ...state,
        assign_company_id: action.data,
      };
    case "UpdateDataJO":
      return {
        ...state,
        job_order_to_be_assign: action.data,
        assigned_fieldman: action.assigned_fieldman,
        jo_assign: [],
      };
    case "JoAccounts":
      return {
        ...state,
        jo_accounts: action.data,
      };
    case "ClearCheckBox":
      return {
        ...state,
        jo_assign: action.data,
      };
    case "clearAssign":
      return {
        ...state,
        jo_assign: action.data,
      };
      case "mru":
        return {
          ...state,
          mru: action.data,
        };
        case "mru":
          return {
            ...state,
            mru: action.data,
          };
    default:
      return state;
  }
};
export default dataReducer;
