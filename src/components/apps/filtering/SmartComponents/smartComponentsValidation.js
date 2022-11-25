import React from "react";
import { getData } from "../../../api/api";
import { useSelector, useDispatch } from "react-redux";
const SmartComponentValidation = (
  selectedBranch,
  selectedJOValidation,
  openValidationModal
) => {
  const userLoginData = useSelector(
    (state) => state.navigation_reducer.userLoginData
  );
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
    };
  }, [
    state.selectedStatus,
    state.selectedRemarks,
    state.comment,
    state.selectedFieldFinding,
    JSON.stringify(state.field_findings),
    JSON.stringify(selectedBranch),
    JSON.stringify(selectedJOValidation),
    state.reading,
    openValidationModal,
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
      getData("tracking/validateFiltering", data).then((res) => {
        console.log(stateValue.selectedBranch);
      });
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
    getData("tracking/getfield_findings", data).then((res) => {
      if (!isCancelled) {
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
  return { ...stateValue, handleChange, onSubmit };
};

export default SmartComponentValidation;
