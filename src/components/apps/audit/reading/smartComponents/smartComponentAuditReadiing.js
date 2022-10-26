import moment from "moment";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../../../api/api";
let initial = [
  {
    name: "Fieldman",
    key: "f_name",
  },
  {
    name: "Audit Reading",
    key: "audit_present_reading",
  },
  {
    name: "Previous Reading",
    key: "new_previous_reading",
  },
  {
    name: "Date",
    key: "date_accom",
  },
];
let initialActual = [
  {
    name: "Actual Reading",
    key: "actual_reading",
  },
  {
    name: "Date",
    key: "actual_date_accomplished",
  },
  {
    name: "Fieldman",
    key: "actual_fieldman_name",
  },
];
let initialValidation = [
  {
    name: "Status",
    key: "validator_remarks",
  },
  {
    name: "Remarks",
    key: "validator_remark_type",
  },
  {
    name: "Comment",
    key: "validator_comment",
  },
  {
    name: "Validator",
    key: "validator_name",
  },
  {
    name: "Date",
    key: "date_validated",
  },
];
const SmartComponentsAuditReading = () => {
  const dispatch = useDispatch();
  const handleBranch = useSelector((state) => state.home_reducer.handleBranch);
  let branchData = handleBranch.filter(
    (val) => val.branch_field_work != "" && val.branch_field_work != null
  );
  branchData.sort(function (a, b) {
    return a["branch_name"].localeCompare(b["branch_name"]);
  });
  const loading_map = useSelector((state) => state.map_reducer.loading_map);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [state, setState] = React.useState({
    selectedBranch: { branch_name: "Please Select Branch" },
    selectedJobOrder: "Audit Reading",
    filterBranch: null,
    filterDates: null,
    date_from: new Date(),
    date_to: new Date(),
    dataList: [],
    totalCount: 0,
    totalCardCount: 0,
    discrepancyCount: 0,
    validCount: 0,
    invalidCount: 0,
    discrepancy: 0,
    loadingProgress: false,
    refresh: false,
    cardStatus: "",
    degree: 0,
    openModal: false,
    selectedAccom: [],
    search: "",
    refreshSearch: false,
    branchFieldDtails: initial,
    selectedIndex: "",
    validation_status: "",
    validation_remarks: "",
    field_findings: [],
    category_remarks: [],
    validation_remarks_category: "",
    validator_comment: "",
    validationDisplay: false,
  });

  const handleClickBranch = (event) => {
    setState((prev) => ({
      ...prev,
      filterBranch: event.currentTarget,
    }));
  };
  const onChangeRemarks = (e) => {
    let category = [];
    state.field_findings.forEach((val) => {
      if (val.findings == e.target.value) {
        if (val.category !== null && val.category !== "") {
          category = JSON.parse(val.category);
        }
      }
    });

    setState((prev) => ({
      ...prev,
      validation_remarks: e.target.value,
      category_remarks: category,
    }));
  };
  const cancelValidation = () => {
    setState((prev) => ({
      ...prev,
      edit: false,
      validation_status: "",
      validator_comment: "",
      validation_remarks: "",
      category_remarks: [],
      validation_remarks_category: "",
    }));
  };
  const onSubmitRemarks = (e) => {
    e.preventDefault();
    dispatch({ type: "loading_map", data: true });
    let accom_id = "";
    state.selectedAccom.map((val, index) => {
      accom_id = val.accom_id;
    });
    let data = {
      validation_status: state.validation_status,
      value: state.validation_remarks,
      user_id: localStorage.getItem("u"),
      accom_id: accom_id,
      validation_remarks_category: state.validation_remarks_category,
      validator_comment: state.validator_comment,
    };
    let validation_remarks = state.validation_remarks;
    let validation_remarks_category = state.validation_remarks_category;
    let validator_comment = state.validator_comment;
    let validation_status = state.validation_status;

    getData("tracking/onChangeValidationRemarks", data).then((res) => {
      if (res.response === true) {
        state.selectedAccom.map((val, index) => {
          val.validator_remark_type = validation_remarks;
          val.validator_remark_type_category = validation_remarks_category;
          val.validator_comment = validator_comment;
          val.validator_remarks = validation_status;
        });
        setState((prev) => ({
          ...prev,
          edit: false,
          validation_status: "",
          validation_status: "",
          validator_comment: "",
          validation_remarks: "",
          category_remarks: [],
          validation_remarks_category: "",
        }));
      }
      getAuditReadingCountStatus();

      dispatch({ type: "loading_map", data: false });
    });
  };
  const handleCloseBranch = () => {
    setState((prev) => ({
      ...prev,
      filterBranch: null,
    }));
  };
  const handleClickDates = (event) => {
    setState((prev) => ({
      ...prev,
      filterDates: event.currentTarget,
    }));
  };
  const handleCloseDates = () => {
    setState((prev) => ({
      ...prev,
      filterDates: null,
    }));
  };
  const onChangeBranch = (val) => {
    setState((prev) => ({
      ...prev,
      selectedBranch: val,
      refresh: !state.refresh,
    }));
    setPage(0);
    handleCloseBranch();
  };
  const onChangeText = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  React.useEffect(() => {
    getAudit();
  }, [state.refresh, page, rowsPerPage, state.cardStatus, state.refreshSearch]);
  React.useEffect(() => {
    getFieldFindings();
    getAudit();
    disrepancy();
    getAuditReadingCountStatus();
  }, [state.refresh]);

  const getAuditReadingCountStatus = () => {
    let data = {
      branch_id: selectedBranch?.branch_id,
      date_from: moment(state.date_from).format("YYYY-MM-DD"),
      date_to: moment(state.date_from).format("YYYY-MM-DD"),
      jo_type: state.selectedJobOrder,
      page: page + 1,
      limit: rowsPerPage,
      search: "",
    };
    setState((prev) => ({
      ...prev,
      loadingProgress: true,
    }));
    getData("tracking/getAuditReadingCountStatus", data).then((res) => {
      setState((prev) => ({
        ...prev,
        totalCardCount:
          res.cardStatus[0]?.total == null ? 0 : res.cardStatus[0].total,
        invalidCount:
          res.cardStatus[0]?.invalid == null ? 0 : res.cardStatus[0].invalid,
        validCount:
          res.cardStatus[0]?.valid == null ? 0 : res.cardStatus[0].valid,
      }));
    });
  };
  const getAudit = () => {
    dispatch({
      type: "loading_map",
      data: true,
    });
    let data = {
      branch_id: selectedBranch?.branch_id,
      date_from: moment(state.date_from).format("YYYY-MM-DD"),
      date_to: moment(state.date_from).format("YYYY-MM-DD"),
      jo_type: state.selectedJobOrder,
      page: page + 1,
      limit: rowsPerPage,
      search: state.search,
      cardStatus: state.cardStatus,
    };
    let api = "tracking/trackAuditReading";
    if (state.cardStatus == "Discrepancy") {
      api = "tracking/disrepancyList";
    }
    getData(api, data)
      .then((res) => {
        if (state.cardStatus == "Discrepancy") {
          if (Number.isInteger(state.selectedIndex)) {
            let selected = res.disrepancyList[state.selectedIndex];
            console.log(selected);
            handleOpen(selected, state.selectedIndex);
          } else {
            dispatch({
              type: "loading_map",
              data: false,
            });
          }
          setState((prev) => ({
            ...prev,
            dataList: res.disrepancyList,
            totalCount: state.discrepancyCount,
          }));
        } else {
          if (Number.isInteger(state.selectedIndex)) {
            let selected = res.dataList[state.selectedIndex];
            console.log(selected);
            handleOpen(selected, state.selectedIndex);
          } else {
            dispatch({
              type: "loading_map",
              data: false,
            });
          }
          setState((prev) => ({
            ...prev,
            dataList: res.dataList,
            totalCount: res.dataListCount,
          }));
        }
      })
      .catch(() => {
        dispatch({
          type: "loading_map",
          data: false,
        });
      });
  };
  const disrepancy = () => {
    let data = {
      branch_id: selectedBranch?.branch_id,
      date_from: moment(state.date_from).format("YYYY-MM-DD"),
      date_to: moment(state.date_from).format("YYYY-MM-DD"),
      jo_type: state.selectedJobOrder,
      page: page + 1,
      limit: rowsPerPage,
      search: "",
    };
    setState((prev) => ({
      ...prev,
      loadingProgress: true,
    }));
    getData("tracking/disrepancy", data).then((res) => {
      setState((prev) => ({
        ...prev,
        loadingProgress: false,
        discrepancyCount:
          res.getFieldmanActualReadingVSAuditReading[0]?.discrepancy == null
            ? 0
            : res.getFieldmanActualReadingVSAuditReading[0]?.discrepancy,
      }));
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onSubmitDate = () => {
    setState((prev) => ({
      ...prev,
      refresh: !state.refresh,
    }));
    handleCloseDates();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const formatNumber = (num) => {
    let num2 = num;
    return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const onSelectStatus = (status) => {
    setPage(0);

    setState((prev) => ({
      ...prev,
      cardStatus: status,
    }));
  };

  const ClickDiscrepancy = () => {
    let data = {
      branch_id: selectedBranch?.branch_id,
      date_from: moment(state.date_from).format("YYYY-MM-DD"),
      date_to: moment(state.date_from).format("YYYY-MM-DD"),
      jo_type: state.selectedJobOrder,
      page: page + 1,
      limit: rowsPerPage,
      search: "",
    };
    dispatch({
      type: "loading_map",
      data: true,
    });
    getData("tracking/disrepancyList", data).then((res) => {
      setState((prev) => ({
        ...prev,
        dataList: res.disrepancyList,
        totalCount: state.discrepancyCount,
      }));
      dispatch({
        type: "loading_map",
        data: false,
      });
    });
  };
  const leftRotate = () => {
    setState((prev) => ({
      ...prev,
      degree: state.degree - 90,
    }));
  };
  const rightRotate = () => {
    setState((prev) => ({
      ...prev,
      degree: state.degree - 90,
    }));
  };
  const handleClose = () => {
    setState((prev) => ({
      ...prev,
      openModal: false,
      selectedIndex: "",
    }));
  };
  const handleOpen = (row, index) => {
    console.log(row);
    let data = {
      date_from: moment(row.date_accom).format("YYYY-MM-DD"),
      branch_id: row.branch_id,
      meter_no: row.meter_no,
      meter_type: row.meter_type,
    };
    dispatch({
      type: "loading_map",
      data: true,
    });
    getData("tracking/getAcctualReading", data).then((res) => {
      if (res.actualReading.length > 0) {
        row.actual_reading = res.actualReading[0]?.actual_reading;
        row.actual_date_accomplished = res.actualReading[0]?.date_accomplished;
        row.actual_fieldman_name = res.actualReading[0]?.fieldman_name;
        row.new_previous_reading = res.actualReading[0]?.previous_reading;
      }
      let latlong = String(row.fetched_coordinates);
      let splitlatlng = latlong.split(",");
      let lat_data = splitlatlng[0];
      let lng_data = splitlatlng[1];

      setTimeout(() => {
        dispatch({
          type: "loading_map",
          data: false,
        });
        dispatch({
          type: "latitude",
          data: lat_data,
        });
        dispatch({
          type: "longitude",
          data: lng_data,
        });
        setState((prev) => ({
          ...prev,
          openModal: true,
          selectedAccom: [row],
          selectedIndex: index,
        }));
      }, 100);
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      refreshSearch: !state.refreshSearch,
    }));
  };
  const onClickPriv = () => {
    let newIndex = state.selectedIndex - 1;
    if (-1 == newIndex) {
      if (page != 0) {
        setPage(page - 1);
        setState((prev) => ({
          ...prev,
          selectedIndex: rowsPerPage - 1,
        }));
      }
    } else {
      let selected = dataList[newIndex];
      handleOpen(selected, newIndex);
    }
  };
  const onClickNext = () => {
    let newIndex = state.selectedIndex + 1;
    if (rowsPerPage > newIndex) {
      let selected = dataList[newIndex];
      handleOpen(selected, newIndex);
    }

    if (rowsPerPage == newIndex) {
      if (page + 1 < Math.ceil(state.totalCount / rowsPerPage)) {
        setPage(page + 1);
        setState((prev) => ({
          ...prev,
          selectedIndex: 0,
        }));
      }
    }
  };
  const getFieldFindings = () => {
    let data = {
      user_id: localStorage.getItem("u"),
      type: "Audit Reading",
      status: "",
      branch_id: selectedBranch?.branch_id,
      company_id: selectedBranch?.company_id,
    };
    getData("tracking/getfield_findings", data).then((res) => {
      setState((prev) => ({
        ...prev,
        field_findings: res.field_findings,
      }));
    });
  };
  const onValidationDisplay = () => {
    setState((prev) => ({
      ...prev,
      validationDisplay: !state.validationDisplay,
    }));
  };
  const columns = [
    { id: "mru", label: "MRU" },
    { id: "meter_no", label: "Meter No." },
    { id: "meter_type", label: "Meter Type" },
    { id: "name", label: "Customer Name" },
    { id: "f_name", label: "Fieldman" },
    { id: "date_accom", label: "Date Accomplished" },
  ];
  let selectedBranch = state.selectedBranch;
  let selectedJobOrder = state.selectedJobOrder;
  let filterBranch = state.filterBranch;
  let filterDates = state.filterDates;
  let dataList = state.dataList;
  let totalCount = state.totalCount;
  let discrepancyCount = state.discrepancyCount;
  let validCount = state.validCount;
  let invalidCount = state.invalidCount;
  let totalCardCount = state.totalCardCount;
  let loadingProgress = state.loadingProgress;
  let degree = state.degree;
  let openModal = state.openModal;
  let selectedAccom = state.selectedAccom;
  let branchFieldDtails = state.branchFieldDtails;
  let cardStatus = state.cardStatus;
  let date_from = state.date_from;
  let selectedIndex = state.selectedIndex;
  let validation_status = state.validation_status;
  let validation_remarks = state.validation_remarks;
  let field_findings = state.field_findings;
  let category_remarks = state.category_remarks;
  let validation_remarks_category = state.validation_remarks_category;
  let validator_comment = state.validator_comment;
  let validationDisplay = state.validationDisplay;
  return {
    handleClickBranch,
    handleCloseBranch,
    selectedBranch,
    selectedJobOrder,
    filterBranch,
    onChangeBranch,
    branchData,
    handleClickDates,
    handleCloseDates,
    filterDates,
    onChangeText,
    dataList,
    columns,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    totalCount,
    discrepancyCount,
    validCount,
    invalidCount,
    totalCardCount,
    loadingProgress,
    onSubmitDate,
    formatNumber,
    loading_map,
    onSelectStatus,
    ClickDiscrepancy,
    leftRotate,
    rightRotate,
    degree,
    handleClose,
    selectedAccom,
    openModal,
    handleOpen,
    onSubmit,
    branchFieldDtails,
    initialActual,
    initialValidation,
    cardStatus,
    date_from,
    selectedIndex,
    onClickPriv,
    onClickNext,
    validation_status,
    validation_remarks,
    field_findings,
    category_remarks,
    validation_remarks_category,
    validator_comment,
    onSubmitRemarks,
    onChangeRemarks,
    validationDisplay,
    onValidationDisplay,
    cancelValidation,
  };
};

export default SmartComponentsAuditReading;
