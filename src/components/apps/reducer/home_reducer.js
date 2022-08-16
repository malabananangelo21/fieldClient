const initialState = {
  accom_Data: [],
  handleBranch: [],
  getAccomplishments: [],
  searchTable: [],
  imgBtn: "",
  filterTable: [],
  accomLoading: false,
  singleAccom: [],
  latitude: 0,
  longitude: 0,
  company_name: [],
  SelectedBranches: [],
  SelectedBranch: [],
  dateFrom: "",
  dateTo: "",
  accom64: [],
  getLogo: [],
  accountData: [],
  image: [],
  all_images: [],
  same_imgType: [],
  SelectedNameBranch: "",
  loader: false,
  loadingIndex: false,
  system_apps: false,
  field_apps: false,
};
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "accom_Data":
      return {
        ...state,
        accom_Data: action.data,
      };
    case "gethandleBranch":
      return {
        ...state,
        handleBranch: action.data,
      };
    case "accomplishment":
      return {
        ...state,
        getAccomplishments: action.data,
        searchTable: action.data,
        filterTable: action.data,
      };
    case "search":
      let EmployeeSearch = state.getAccomplishments.filter((files) => {
        return (
          files.fieldman
            .toLowerCase()
            .indexOf(action.data.toLocaleLowerCase()) !== -1 ||
          files.customermeternumber
            .toLowerCase()
            .indexOf(action.data.toLocaleLowerCase()) !== -1 ||
          files.fieldfindings
            .toLowerCase()
            .indexOf(action.data.toLocaleLowerCase()) !== -1
        );
      });
      return {
        ...state,
        searchTable: EmployeeSearch,
      };
    case "search2":
      let EmployeeSearch2 = state.getAccomplishments.filter((files) => {
        return (
          files.user_fname
            .toLowerCase()
            .indexOf(action.data.toLocaleLowerCase()) !== -1 ||
          files.user_lname
            .toLowerCase()
            .indexOf(action.data.toLocaleLowerCase()) !== -1 ||
          files.findings
            .toLowerCase()
            .indexOf(action.data.toLocaleLowerCase()) !== -1
        );
      });
      return {
        ...state,
        searchTable: EmployeeSearch2,
      };
    case "filter":
      let Filtering = state.searchTable.filter((files) => {
        return (
          files.findings
            .toLowerCase()
            .indexOf(action.data.toLocaleLowerCase()) !== -1
        );
      });
      return {
        ...state,
        searchTable: Filtering,
      };
    case "imgBtn":
      return {
        ...state,
        imgBtn: action.data,
      };
    case "accomLoading":
      return {
        ...state,
        accomLoading: action.data,
      };
    case "singleAccom":
      return {
        ...state,
        singleAccom: action.data,
      };
    case "latitude":
      return {
        ...state,
        latitude: action.data,
      };
    case "longitude":
      return {
        ...state,
        longitude: action.data,
      };
    case "company_name":
      return {
        ...state,
        company_name: action.data,
      };
    case "SelectedBranches":
      return {
        ...state,
        SelectedBranches: action.data,
      };
    case "SelectedBranch":
      return {
        ...state,
        SelectedBranch: state.SelectedBranches.filter(
          (val) => val.branch_id == action.data
        ),
      };
    case "dateFrom":
      return {
        ...state,
        dateFrom: action.data,
      };
    case "dateTo":
      return {
        ...state,
        dateTo: action.data,
      };
    case "accom64":
      return {
        ...state,
        accom64: action.data,
      };
    case "getLogo":
      return {
        ...state,
        getLogo: action.data,
      };
    case "accountData":
      return {
        ...state,
        accountData: action.data,
      };
    case "image":
      return {
        ...state,
        image: action.data,
      };
    case "all_images":
      return {
        ...state,
        all_images: action.data,
      };
    case "same_imgType":
      return {
        ...state,
        same_imgType: action.data,
      };
    case "SelectedNameBranch":
      return {
        ...state,
        SelectedNameBranch: action.data,
      };
    case "loader":
      return {
        ...state,
        loader: action.data,
      };
    case "LoadingIndex":
      return {
        ...state,
        loadingIndex: action.data,
      };
      case "system_apps":
        return {
          ...state,
          system_apps: action.data,
        };
        case "field_apps":
          return {
            ...state,
            field_apps: action.data,
          };
      case "onChangeHomeReducer":
        return {
          ...state,
          ...action.data,
        };      
    default:
      return state;
  }
};
export default dataReducer;
