import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData, cancelRequest } from "../../../api/api";

const SmartComponentsFiltering = () => {
  const handleBranch = useSelector((state) => state.home_reducer.handleBranch);
  const loading_map = useSelector((state) => state.map_reducer.loading_map);
  const dispatch = useDispatch();
  let branchData = handleBranch.filter(
    (val) => val.branch_field_work != "" && val.branch_field_work != null
  );
  const [page, setPage] = React.useState(0);
  branchData.sort(function (a, b) {
    return a["branch_name"].localeCompare(b["branch_name"]);
  });
  const [state, setState] = React.useState({
    date_type: "",
    selectedBranch: { branch_name: "Please Select Branch" },
    selectedJobOrder: "Reading",
    selectedJobOrderDisplay: "Reading",
    filterBranch: false,
    filterDates: false,
    filterFieldman: false,
    filterJo: false,
    month: new Date(),
    search: "",
    refresh: false,
    dataList: [],
    totalCount: 0,
    normalCount: 0,
    highCount: 0,
    lowCount: 0,
    zeroCount: 0,
    invalidCount: 0,
    fieldFindings: 0,
    negativeConsumption: 0,
    valid: 0,
    invalid: 0,
    dataMasterList: [],
    openModal: false,
    filteringDetails: [],
    linegraphData: [],
    audit: [],
    openValidationModal: false,
    selectedJOValidation: [],
    field_findings: [],
    userList: [],
    selectedFieldman: "",
    selectedFieldmanName: "",
    meter_type_sixteen: 0,
  });
  const handleClickBranch = React.useCallback(
    (event) => {
      setState((prev) => ({
        ...prev,
        filterBranch: event.currentTarget,
      }));
    },
    [state.filterBranch]
  );
  const getUsers = (branch_id) => {
    const data = {
      branch_id: branch_id,
    };
    dispatch({ type: "loading_map", data: true });
    getData("users/getUserByBranch", data)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          userList: res.users,
        }));
      })
      .finally(() => {
        dispatch({ type: "loading_map", data: false });
      });
  };
  const handleCloseBranch = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      filterBranch: false,
    }));
  }, [state.filterBranch]);
  const handleClickJo = React.useCallback(
    (event) => {
      setState((prev) => ({
        ...prev,
        filterJo: event.currentTarget,
      }));
    },
    [state.filterJo]
  );
  const handleCloseJo = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      filterJo: false,
    }));
  }, [state.filterJo]);
  const handleClickDates = React.useCallback(
    (event) => {
      setState((prev) => ({
        ...prev,
        filterDates: event.currentTarget,
      }));
    },
    [state.filterDates]
  );
  const handleCloseDates = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      filterDates: false,
    }));
  }, [state.filterDates]);
  const handleClickFieldman = React.useCallback(
    (event) => {
      setState((prev) => ({
        ...prev,
        filterFieldman: event.currentTarget,
      }));
    },
    [state.filterFieldman]
  );
  const handleCloseFieldman = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      filterFieldman: false,
    }));
  }, [state.filterFieldman]);
  const onChangeBranch = React.useCallback(
    (val) => {
      getUsers(val.branch_id);
      setState((prev) => ({
        ...prev,
        selectedBranch: val,
        search: "",
        cardStatus: "",
      }));
      setPage(0);
      handleCloseBranch();
    },
    [state.selectedBranch]
  );
  const onChangeJo = React.useCallback(
    (val) => {
      setState((prev) => ({
        ...prev,
        selectedJobOrder: val.type,
        selectedJobOrderDisplay: val.name,
        search: "",
        cardStatus: "",
      }));
      setPage(0);
      handleCloseJo();
    },
    [state.selectedJobOrder]
  );
  const onChangeText = React.useCallback((e) => {
    const value = e.target.value;
    const name = e.target.name;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "month") {
      handleCloseDates();
    }
  }, []);
  const onChangeTextDate = React.useCallback((e, type) => {
    console.log(type);
    const value = e.target.value;
    const name = e.target.name;
    setState((prev) => ({
      ...prev,
      [name]: value,
      date_type: type,
    }));
    if (name === "month") {
      handleCloseDates();
    }
  }, []);
  const onSubmitDate = React.useCallback(() => {
    handleCloseDates();
  }, []);
  const getFiltering = () => {
    setState((prev) => ({
      ...prev,
      search: "",
    }));
    let data = {
      month: state.month,
      branch_id: selectedBranch?.branch_id ? selectedBranch?.branch_id : "",
      jo_type: state.selectedJobOrder,
      search: state.search,
      selectedFieldman: state.selectedFieldman,
    };
    dispatch({ type: "loading_map", data: true });
    getData("tracking/getFiltering2", data)
      .then((res) => {
        if (res) {
          let totalCount = 0;
          let highCount = 0;
          let lowCount = 0;
          let zeroCount = 0;
          let invalidCount = 0;
          let normalCount = 0;
          let fieldFindings = 0;
          let negativeConsumption = 0;
          let valid = 0;
          let invalid = 0;
          let meter_type_sixteen = 0;

          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            if (parseInt(element.meter_type) == 16) {
              meter_type_sixteen++;
            } else {
              if (element.status === "High Consumption") {
                highCount++;
              } else if (element.status === "Low Consumption") {
                lowCount++;
              } else if (element.status === "Invalid Average") {
                invalidCount++;
              } else if (element.status === "Normal Consumption") {
                normalCount++;
              } else if (element.status === "Negative Consumption") {
                negativeConsumption++;
              } else if (element.status === "Zero Consumption") {
                zeroCount++;
              }
            }
            if (element.validation_status_jo === "Valid") {
              valid++;
            } else if (element.validation_status_jo === "Invalid") {
              invalid++;
            }
            if (
              element.field_findings_value != 0 &&
              element.field_findings_value != null
            ) {
              fieldFindings++;
            }
          }
          setState((prev) => ({
            ...prev,
            dataList: res,
            totalCount: res.length,
            highCount: highCount,
            lowCount: lowCount,
            zeroCount: zeroCount,
            invalidCount: invalidCount,
            normalCount: normalCount,
            dataMasterList: res,
            filterDates: false,
            fieldFindings: fieldFindings,
            page: 0,
            negativeConsumption: negativeConsumption,
            valid: valid,
            invalid: invalid,
            meter_type_sixteen: meter_type_sixteen,
          }));
        }
        dispatch({ type: "loading_map", data: false });
      })
      .catch((err) => {});
  };
  React.useEffect(() => {
    getFiltering();
    return () => {
      cancelRequest();
    };
  }, [state.refresh]);
  const formatNumber = (num) => {
    let num2 = num;
    return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  const onSelectStatus = (status) => {
    let filter = state.dataMasterList.filter((val) =>
      status === "Valid" || status === "Invalid"
        ? val.validation_status_jo === status
        : status === "16"
        ? parseInt(val.meter_type) === 16
        : status === val.status
    );
    if (status == "") {
      filter = state.dataMasterList;
    }
    if (status === "Field Findings") {
      filter = state.dataMasterList.filter(
        (val) =>
          val.field_findings_value != 0 && val.field_findings_value != null
      );
    }
    setState((prev) => ({
      ...prev,
      dataList: filter,
      page: 0,
    }));
  };
  const handleClose = () => {
    setState((prev) => ({
      ...prev,
      openModal: false,
    }));
  };
  const onSelectItem = (row) => {
    let data = {
      month: state.month,
      branch_id: selectedBranch?.branch_id ? selectedBranch?.branch_id : "",
      jo_type: state.selectedJobOrder,
      meter_no: row.meter_no,
      meter_type: row.meter_type,
    };
    dispatch({ type: "loading_map", data: true });
    getData("tracking/getfilteringDetails", data).then((res) => {
      let linegraphData = [];
      for (let index = 0; index < res.history.length; index++) {
        const element = res.history[index];
        let details = {
          consumption: element.consumption,
          date: element.date_filter,
        };
        linegraphData.unshift(details);
      }
      setState((prev) => ({
        ...prev,
        openModal: true,
        filteringDetails: res.history,
        linegraphData: linegraphData,
        audit: res.audit,
        selectedJOValidation: row,
      }));
      dispatch({ type: "loading_map", data: false });
    });
  };
  const onSubmitSearch = (e) => {
    e.preventDefault();
    let filter = state.dataMasterList;
    if (state.search != "") {
      filter = state.dataMasterList.filter((files) => {
        return (
          (files.meter_no != "" &&
            files.meter_no != null &&
            files.meter_no
              .toLowerCase()
              .indexOf(state.search.toLocaleLowerCase()) !== -1) ||
          (files.meter_type != "" &&
            files.meter_type != null &&
            files.meter_type
              .toLowerCase()
              .indexOf(state.search.toLocaleLowerCase()) !== -1) ||
          (files.mru != null &&
            files.mru != "" &&
            files.mru
              .toLowerCase()
              .indexOf(state.search.toLocaleLowerCase()) !== -1) ||
          (files.completename != null &&
            files.completename != "" &&
            files.completename
              .toLowerCase()
              .indexOf(state.search.toLocaleLowerCase()) !== -1)
        );
      });
    }

    setState((prev) => ({
      ...prev,
      dataList: filter,
      page: 0,
    }));
  };
  const searchButton = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      refresh: !state.refresh,
    }));
  }, [state.refresh]);
  const handleCloseValidation = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      openValidationModal: false,
    }));
  }, [state.openValidationModal]);
  const handleOpenValidation = React.useCallback(
    (row) => {
      setState((prev) => ({
        ...prev,
        openValidationModal: true,
      }));
    },
    [state.openValidationModal]
  );
  const onSelectFieldman = React.useCallback(
    (e, values) => {
      if (values != null) {
        setState((prev) => ({
          ...prev,
          selectedFieldman: values.user_id,
          selectedFieldmanName: values.COMPLETENAME,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          selectedFieldman: "",
          selectedFieldmanName: "",
        }));
      }
      handleCloseFieldman();
    },
    [state.selectedFieldman]
  );

  const selectedBranch = state.selectedBranch;
  const selectedJobOrder = state.selectedJobOrder;
  const date_from = state.date_from;
  const month = state.month;
  const filterDates = state.filterDates;
  const filterJo = state.filterJo;
  const filterBranch = React.useMemo(
    () => state.filterBranch,
    [state.filterBranch]
  );
  const search = state.search;
  const dataList = state.dataList;
  const totalCount = state.totalCount;
  const highCount = state.highCount;
  const lowCount = state.lowCount;
  const zeroCount = state.zeroCount;
  const invalidCount = state.invalidCount;
  const normalCount = state.normalCount;
  const openModal = state.openModal;
  const filteringDetails = state.filteringDetails;
  const linegraphData = state.linegraphData;
  const selectedJobOrderDisplay = state.selectedJobOrderDisplay;
  const audit = state.audit;
  const openValidationModal = state.openValidationModal;
  const selectedJOValidation = state.selectedJOValidation;
  const filterFieldman = state.filterFieldman;
  const selectedFieldman = state.selectedFieldman;
  const selectedFieldmanName = state.selectedFieldmanName;
  const fieldFindings = state.fieldFindings;
  const negativeConsumption = state.negativeConsumption;
  const valid = state.valid;
  const invalid = state.invalid;
  const meter_type_sixteen = state.meter_type_sixteen;

  const userList = React.useMemo(() => {
    return state.userList;
  }, [JSON.stringify(state.userList)]);
  const updateDetails = (data, file = "") => {
    const dataList = state.dataList.map((val) => val);
    const dataMasterList = state.dataMasterList.map((val) => val);
    let selectedJOValidation = [];
    let valid = 0;
    let invalid = 0;
    let attachment = null;
    if (file != "") {
      attachment = file;
    }
    console.log(file);
    dataList.forEach((element) => {
      if (element.jo_id == data.jo_id) {
        element.validation_status_jo = data.validation_status_jo;
        element.validation_remarks_jo = data.validation_remarks_jo;
        element.validation_comments_jo = data.validation_comments_jo;
        element.validation_correct_reading = data.validation_correct_reading;
        element.validation_attachments = attachment;
        selectedJOValidation = element;
      }
    });
    dataMasterList.forEach((element) => {
      if (element.jo_id == data.jo_id) {
        element.validation_status_jo = data.validation_status_jo;
        element.validation_remarks_jo = data.validation_remarks_jo;
        element.validation_comments_jo = data.validation_comments_jo;
        element.validation_correct_reading = data.validation_correct_reading;
        element.validation_attachments = attachment;
      }
      if (element.validation_status_jo === "Valid") {
        valid++;
      } else if (element.validation_status_jo === "Invalid") {
        invalid++;
      }
    });
    setState((prev) => ({
      ...prev,
      dataList: dataList,
      dataMasterList: dataMasterList,
      selectedJOValidation: selectedJOValidation,
      invalid: invalid,
      valid: valid,
    }));
  };
  const date_type = state.date_type;
  return {
    selectedBranch,
    selectedJobOrder,
    date_from,
    month,
    handleClickBranch,
    handleCloseBranch,
    handleClickJo,
    handleCloseJo,
    handleClickDates,
    handleCloseDates,
    onChangeBranch,
    filterDates,
    filterBranch,
    branchData,
    onChangeText,
    search,
    onSubmitDate,
    dataList,
    totalCount,
    highCount,
    lowCount,
    zeroCount,
    invalidCount,
    normalCount,
    formatNumber,
    onSelectStatus,
    handleClose,
    openModal,
    onSelectItem,
    filteringDetails,
    linegraphData,
    loading_map,
    onSubmitSearch,
    filterJo,
    onChangeJo,
    selectedJobOrderDisplay,
    audit,
    searchButton,
    handleOpenValidation,
    handleCloseValidation,
    openValidationModal,
    selectedJOValidation,
    filterFieldman,
    handleClickFieldman,
    handleCloseFieldman,
    userList,
    onSelectFieldman,
    selectedFieldman,
    selectedFieldmanName,
    fieldFindings,
    updateDetails,
    negativeConsumption,
    valid,
    invalid,
    meter_type_sixteen,
    onChangeTextDate,
    date_type,
  };
};

export default SmartComponentsFiltering;
