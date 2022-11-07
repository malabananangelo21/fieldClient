import React, { useEffect } from "react";
// import '../../../App';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../../css/css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
// import InitialTable from './initial_table/initial_table'
import Button from "@material-ui/core/Button";
import TableChartIcon from "@material-ui/icons/TableChart";
import TextField from "@material-ui/core/TextField";
import { Redirect, Link as NewLink } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import FilterListIcon from "@material-ui/icons/FilterList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import UploadFile from "./upload_file";
import Form from "./form";
import TableTemplate from "./table_template";
import readXlsxFile from "read-excel-file";
import axios from "axios";

const UploadFileComponent = React.memo(
  ({ refesh_upload_file, handleChange, onSubmitUpload }) => {
    return (
      <UploadFile handleChange={handleChange} onSubmitUpload={onSubmitUpload} />
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.refesh_upload_file === nextProps.refesh_upload_file) {
      return true;
    } else {
      return false;
    }
  }
);

const FormComponent = React.memo(
  ({ refresh_form, refreshForm, openUpload, upload_data, disable_form }) => {
    return (
      <Form
        refreshForm={refreshForm}
        openUpload={openUpload}
        upload_data={upload_data}
        disable_form={disable_form}
      />
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.refresh_form === nextProps.refresh_form) {
      return true;
    } else {
      return false;
    }
  }
);

const TableTemplateComponent = React.memo(
  ({
    template_status,
    refresh_table_template,
    upload_data,
    dynamicHeader,
    branch_id,
    company_id,
    ba,
    jo_type,
    cancelTemplate,
    date_start_val,
    file_name,
  }) => {
    return (
      <TableTemplate
        upload_data={upload_data}
        refresh_table_template={refresh_table_template}
        template_status={template_status}
        dynamicHeader={dynamicHeader}
        branch_id={branch_id}
        company_id={company_id}
        ba={ba}
        jo_type={jo_type}
        cancelTemplate={() => cancelTemplate()}
        date_start_val={date_start_val}
        file_name={file_name}
      />
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.refresh_table_template === nextProps.refresh_table_template) {
      return true;
    } else {
      return false;
    }
  }
);

const AssignFieldmanComponents = React.memo(({ props }) => {});
function Index() {
  const home_reducer = useSelector((state) => state.home_reducer);
  const classes = useStyles();
  const dispatch = useDispatch();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const [state, setState] = React.useState({
    upload: false,
    loading: false,
    files: [],
    refesh_upload_file: false,
    refresh_form: false,
    refresh_table_template: false,
    upload_data: [],
    template_status: "",
    dynamicHeader: [],
    business_area: "",
    branch_id: "",
    company_id: "",
    jo_type: "",
    disable_form: false,
    date_start_val: new Date(),
    file_name: "",
  });

  const handleChange = (files) => {
    console.log(files);
    setState({
      ...state,
      files: files,
      refesh_upload_file: !state.refesh_upload_file,
    });
  };
  console.log(state);
  // FormComponent Start
  const refreshForm = (date) => {
    setState({
      ...state,
      refresh_form: !state.refresh_form,
    });
  };
  // FormComponent End
  // const onSubmitUpload = (e) => {
  //   e.preventDefault();
  //   let filename = state.files[0].name
  //   readXlsxFile(state.files[0]).then((row) => {
  //     setState({
  //       ...state,
  //       template_status: state.template_status,
  //       upload_data: row,
  //       upload: false,
  //       refresh_form: !state.refresh_form,
  //       refresh_table_template: !state.refresh_table_template,
  //       file_name:filename
  //     });
  //   });
  // };
  const onSubmitUpload = (e) => {
    e.preventDefault();
    dispatch_data("LoadingIndex", true);
    let filename = state.files[0].name;
    const formData = new FormData();
    for (let i = 0; i < state.files.length; i++) {
      formData.append("file" + i, state.files[i]);
    }
    axios
      .post(
        "https://api.workflow.gzonetechph.com/aam/uploadDynamicData/" +
          localStorage.getItem("u") +
          "/" +
          "?key=PocketHR@20190208&type=web",
        formData
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error_message);
        } else {
          setState({
            ...state,
            template_status: state.template_status,
            upload_data: response.data.columns_empty,
            upload: false,
            refresh_form: !state.refresh_form,
            refresh_table_template: !state.refresh_table_template,
            file_name: filename,
          });
        }

        dispatch_data("LoadingIndex", false);
      });
  };

  const onOpenUpload = (
    data,
    dynamicHeader,
    ba,
    branch_id,
    company_id,
    jo_type,
    date_start_val
  ) => {
    let status = "Create";
    if (data.length > 0) {
      status = "Existing";
    }

    setState({
      ...state,
      upload: data,
      template_status: status,
      dynamicHeader: dynamicHeader,
      business_area: ba,
      branch_id: branch_id,
      company_id: company_id,
      jo_type: jo_type,
      disable_form: true,
      date_start_val: date_start_val,
    });
  };
  const cancelTemplate = () => {
    setState({
      ...state,
      template_status: "",
      edit: false,
      disable_form: false,
      refresh_form: !state.refresh_form,
      refresh_table_template: !state.refresh_table_template,
      upload_data: [],
      dynamicHeader: [],
    });
  };
  return (
    <div className={classes.root} style={{ paddingRight: 20 }}>
      <Backdrop
        className={classes.backdrop}
        open={home_reducer.loadingIndex}
        // onClick={() => dispatch_data("LoadingIndex", false)}
        style={{ zIndex: 99999999 }}
      >
        {/* <CircularProgress color="inherit" /> */}
        <div className="loader"></div>
      </Backdrop>

      <Breadcrumbs aria-label="breadcrumb" style={{ margin: 10 }}>
        <Typography
          style={{ color: "#3973b6", fontWeight: "bold", fontSize: 17 }}
        >
          Home
        </Typography>
        <Typography
          style={{ color: "#444b5a", fontWeight: "bold", fontSize: 17 }}
        >
          Upload File
        </Typography>
      </Breadcrumbs>
      <NotificationContainer />
      {/* <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Button
            onClick={() => {
              setState({ ...state, upload: true });
            }}
            size="medium"
            variant="contained"
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginRight: 5,
            }}
            className={classes.button}
            startIcon={<CloudUploadIcon />}
          >
            Upload File
          </Button>
          <Button
            onClick={() => {
              setState({ ...state, upload: true });
            }}
            size="medium"
            variant="contained"
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginRight: 5,
            }}
            className={classes.button}
            startIcon={<AddCircleIcon />}
          >
            Template
          </Button>
        </Grid>
      </Grid> */}
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <FormComponent
            refresh_form={state.refresh_form}
            refreshForm={() => refreshForm()}
            openUpload={onOpenUpload}
            upload_data={state.upload_data.length}
            disable_form={state.disable_form}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TableTemplateComponent
            template_status={state.template_status}
            refresh_table_template={state.refresh_table_template}
            upload_data={state.upload_data}
            dynamicHeader={state.dynamicHeader}
            branch_id={state.branch_id}
            company_id={state.company_id}
            ba={state.business_area}
            jo_type={state.jo_type}
            cancelTemplate={() => {
              cancelTemplate();
            }}
            date_start_val={state.date_start_val}
            file_name={state.file_name}
          />
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.upload}
        onClose={() => {
          setState({ ...state, upload: false });
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Upload file</DialogTitle>
        <div style={{ position: "absolute", zIndex: 2, right: 2, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              style={{ color: "#000" }}
              onClick={() => {
                setState({ ...state, upload: false });
              }}
            />
          </IconButton>
        </div>
        <DialogContent>
          <UploadFileComponent
            refesh_upload_file={state.refesh_upload_file}
            handleChange={handleChange}
            onSubmitUpload={onSubmitUpload}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Index;
