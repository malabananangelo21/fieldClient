import React from "react";
import { getData } from "../../../api/api";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"
const SmartComponentValidation = (
  selectedBranch,
  selectedJOValidation,
  openValidationModal,
  updateDetails
) => {
  const userLoginData = useSelector(
    (state) => state.navigation_reducer.userLoginData
  );
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    status: ["Valid", "Invalid"],
    selectedStatus: "",
    remarks: [],
    selectedRemarks: "",
    reading: "",
    comment: "",
    field_findings: [],
    refresh: false,
    selectedFieldFinding: "",
    files:[],
    loadingImage:false,
    degree:0,
    imageLoaded:false
  });
  const stateValue = React.useMemo(() => {
    return {
      status: state.status,
      selectedStatus: state.selectedStatus,
      remarks: state.remarks,
      selectedRemarks: state.selectedRemarks,
      comment: state.comment,
      field_findings: state.field_findings,
      selectedBranch: selectedBranch,
      reading: state.reading,
      selectedJOValidation: selectedJOValidation,
      openValidationModal: openValidationModal,
      files:state.files,
      loadingImage:state.loadingImage,
      degree:state.degree,
      imageLoaded:state.imageLoaded
    };
  }, [
    state.selectedStatus,
    state.selectedRemarks,
    state.comment,
    state.selectedFieldFinding,
    JSON.stringify(state.field_findings),
    JSON.stringify(selectedBranch),
    JSON.stringify(selectedJOValidation),
    JSON.stringify(state.files),
    state.reading,
    openValidationModal,
    state.loadingImage,
    state.degree,
  ]);

  const handleChange = React.useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [stateValue]
  );

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      for (let i = 0; i < state.files.length; i++) {
        formData.append('file' + i, state.files[i])
      }
      dispatch({ type: "loading_map", data: true });
      const data = {
        validation_status_jo: state.selectedStatus,
        validation_remarks_jo: state.selectedRemarks,
        validation_comments_jo: state.comment,
        validation_correct_reading: state.reading,
        validator_id_jo: userLoginData.user_id,
        jo_id: stateValue.selectedJOValidation?.jo_id,
        bid: stateValue.selectedBranch?.branch_id,
        // validator_name: userLoginData.complete_name,
      };
      formData.append('data',JSON.stringify(data))
      axios.post("https://api.workflow.gzonetechph.com/tracking/validateFilteringWithAttachments/" + localStorage.getItem("u") + "/" + "?key=PocketHR@20190208&type=web", formData)
      .then((response) => {
        updateDetails(data,response.data);
        dispatch({ type: "loading_map", data: false });

      })
      // getData("tracking/validateFiltering", data).then((res) => {
      //   updateDetails(data);
      //   dispatch({ type: "loading_map", data: false });
      // });
    },
    [stateValue]
  );
  const getFieldFindings = (isCancelled) => {
    let data = {
      user_id: localStorage.getItem("u"),
      type: "Filtering",
      status: "",
      branch_id: stateValue.selectedBranch?.branch_id
        ? selectedBranch?.branch_id
        : "",
      company_id: stateValue.selectedBranch?.company_id
        ? selectedBranch?.company_id
        : "",
    };
    dispatch({ type: "loading_map", data: true });
    getData("tracking/getfield_findings", data).then((res) => {
      if (!isCancelled) {
        dispatch({ type: "loading_map", data: false });
        setState((prev) => ({
          ...prev,
          field_findings: res.field_findings,
          selectedStatus:
            selectedJOValidation?.validation_status_jo == null
              ? ""
              : selectedJOValidation?.validation_status_jo,
          selectedRemarks:
            selectedJOValidation?.validation_remarks_jo == null
              ? ""
              : selectedJOValidation?.validation_remarks_jo,
          reading:
            selectedJOValidation?.validation_correct_reading == null
              ? ""
              : selectedJOValidation?.validation_correct_reading,
          comment:
            selectedJOValidation?.validation_comments_jo == null
              ? ""
              : selectedJOValidation?.validation_comments_jo,
        }));
      }
    });
  };

  React.useEffect(() => {
    let isCancelled = false;
    stateValue.openValidationModal
      ? getFieldFindings(isCancelled)
      : setState((prev) => ({
          ...prev,
          selectedStatus: "",
          selectedRemarks: "",
          reading: "",
          comment: "",
        }));

    return () => {
      isCancelled = true;
    };
  }, [stateValue.openValidationModal]);

  const onChangeFile=(e)=>{
    const newFile = e.target.files;
    const newData = [];
    for (let index = 0; index < newFile.length; index++) {
      const element = newFile[index];
      newData.push(element);
    }
    setState((prev) => ({
      ...prev,
      files: newData,
    }));
  }
  const onRightRotate=()=>{
    setState((prev) => ({
      ...prev,
      degree: state.degree + 90,
    }));
  }
  const onLeftRotate=()=>{
    console.log("test")
    setState((prev) => ({
      ...prev,
      degree: state.degree - 90,
    }));
  }
  return { ...stateValue, handleChange, onSubmit ,onChangeFile,onRightRotate,onLeftRotate};
};

export default SmartComponentValidation;
