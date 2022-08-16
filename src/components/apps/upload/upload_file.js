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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { DropzoneArea } from 'material-ui-dropzone'
import readXlsxFile from "read-excel-file";

function Index({handleChange,onSubmitUpload}) {
  const home_reducer = useSelector((state) => state.home_reducer);
  const classes = useStyles();

  const [state, setState] = React.useState({
    upload: false,
    loading:false
  });
  return (
    <div className={classes.root}>
      <form onSubmit={onSubmitUpload}>
      <DropzoneArea
          className={classes.drop_zone_area}
          acceptedFiles={[".csv,.xlsx,text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
          onChange={handleChange}
          showFileNames={true}
          maxFileSize={500800000}
      />
      <div style={{width:'100%',display:'flex',justifyContent:'flex-end',marginTop: 10}}>
      <Button
            type='submit'
            size="medium"
            variant="contained"
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginRight: 5,
            }}
            className={classes.button}
           
          >
           Submit
          </Button>
      </div>
      </form>
  
         
    </div>
  );
}

export default Index;
