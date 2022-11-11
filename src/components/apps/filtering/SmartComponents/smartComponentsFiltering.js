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
    selectedBranch: { branch_name: "Please Select Branch" },
    selectedJobOrder: "Reading",
    selectedJobOrderDisplay: "Reading",
    filterBranch: false,
    filterDates: false,
    filterJo: false,
    month: new Date(),
    search: "",
    refresh: false,
    dataList: [],
    totalCount: 0,
    normalCount: 0,
    highCount: 0,
    lowCount: 0,
    invalidCount: 0,
    dataMasterList: [],
    openModal: false,
    filteringDetails: [],
    linegraphData: [],
    audit: [],
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
  const onChangeBranch = React.useCallback(
    (val) => {
      setState((prev) => ({
        ...prev,
        selectedBranch: val,
        refresh: !state.refresh,
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
        refresh: !state.refresh,
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
  }, []);
  const onSubmitDate = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      refresh: !state.refresh,
    }));
  }, [state.refresh]);
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
    };
    dispatch({ type: "loading_map", data: true });
    getData("tracking/getFiltering", data)
      .then((res) => {
        if (res) {
          let totalCount = 0;
          let highCount = 0;
          let lowCount = 0;
          let invalidCount = 0;
          let normalCount = 0;

          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            if (element.status === "High Consumption") {
              highCount++;
            } else if (element.status === "Low Consumption") {
              lowCount++;
            } else if (element.status === "Invalid Average") {
              invalidCount++;
            } else if (element.status === "Normal Consumption") {
              normalCount++;
            }
          }
          setState((prev) => ({
            ...prev,
            dataList: res,
            totalCount: res.length,
            highCount: highCount,
            lowCount: lowCount,
            invalidCount: invalidCount,
            normalCount: normalCount,
            dataMasterList: res,
            filterDates: false,
            page: 0,
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
    let filter = state.dataMasterList.filter((val) => status === val.status);
    if (status == "") {
      filter = state.dataMasterList;
    }
    setState((prev) => ({
      ...prev,
      dataList: filter,
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
          files.meter_no
            .toLowerCase()
            .indexOf(state.search.toLocaleLowerCase()) !== -1 ||
          files.meter_type
            .toLowerCase()
            .indexOf(state.search.toLocaleLowerCase()) !== -1
        );
      });
    }

    setState((prev) => ({
      ...prev,
      dataList: filter,
      page: 0,
    }));
  };
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
  const invalidCount = state.invalidCount;
  const normalCount = state.normalCount;
  const openModal = state.openModal;
  const filteringDetails = state.filteringDetails;
  const linegraphData = state.linegraphData;
  const selectedJobOrderDisplay = state.selectedJobOrderDisplay;
  const audit = state.audit;

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
  };
};

export default SmartComponentsFiltering;
