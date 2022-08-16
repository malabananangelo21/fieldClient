const initialState = {
    InitialPies: [],  
    dateStart: "",
    branch: "",
    jotype: "",
    companyID: "",
  };
  const realtimeReducer = (state = initialState, action) => {
    switch (action.type) {
      case "realtime_Data":
        return {
          ...state,
          InitialPies: action.pass_Pie,
        };
        case "InitializedPage":
          return {
            ...state,
            dateStart: action.passDateStart,
            branch: action.passBranch,
            jotype: action.passJotype,
            companyID: action.passCompanyID,
          };
      default:
        return state;
    }
  };
  export default realtimeReducer;
  