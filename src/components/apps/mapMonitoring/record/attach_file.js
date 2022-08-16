import React from "react";
import clsx from "clsx";
import "../../../../../src/App.css";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import UserImage from "../../../../assets/map image/user_image.png";
import moment from "moment";
import {
  Grid,
  Card,
  LinearProgress,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import PieGrap from "../charts/d_pie2";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { getData } from "../../../api/api";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Scrollbars } from "react-custom-scrollbars";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import AccomMemo from "../memo/accom";
import { DropzoneArea } from "material-ui-dropzone";
import { DropzoneDialog } from "material-ui-dropzone";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux"; 
import axios from "axios"
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },

  hoverDialog: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  large: {
    width: 100,
    height: 100,
  },
  whiteText: {
    color: "#fff",
  },
  allTable: {
    color: "#dcdcdc",
    fontSize: 12,
    borderColor: "rgb(255 255 255 / 15%)",
  },
  tableHead: {
    color: "#fff",
    fontSize: 13,
    borderColor: "rgb(255 255 255 / 15%)",
  },
  dashboards: {
    background: "rgba(0,0,0,0.7)",
  },
  filterBox: {
    background: "rgba(0,0,0,0.7)",
  },
});

function AttachFile({ user_id,attach_data,closeAttachfile}) {
    const dispatch = useDispatch();
  const [state, setState] = React.useState({
    files: [],
    type:''
  });
  const classes = useStyles();
  const formatNumber = (num) => {
    if (num != "") {
      let num2 = parseFloat(num);
      return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return 0;
    }
  };
  const handleChange = (files) => {
    setState({
      ...state,
      files: files,
      
    });
  };
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const onSubmit = (e) =>{
    e.preventDefault();
    dispatch_data("loading_map", true);
    console.log(state.files);
    let data = {
        user_id:user_id,
        type:state.type,
        date:moment(attach_data.jo_date_assign).format('YYYY-MM-DD'),
        hr_id:localStorage.getItem('u')
    }
    const formData = new FormData();
    for (let i = 0; i < state.files.length; i++) {
        formData.append('file' + i, state.files[i])
    }
    formData.append('arrayparam', JSON.stringify(data))
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.post("http://api.pacificweb.com.ph/tracking/attachFile/"+ "?key=PocketHR@20190208&type=web", formData)
        .then((response) => {
            closeAttachfile()
            dispatch_data("loading_map", false);
        })
        
  }
  const onChangeType = (e) => {
    setState({
        ...state,
        type: e.target.value
    })
}
  return (
    <div>
      <form onSubmit={onSubmit}>
        <FormControl
          size="small"
          className={classes.formControl}
          style={{ marginBottom: 20, width: "100%" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Type of Explanation
          </InputLabel>
          <Select
            required
            style={{ textAlign: "justify" }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={onChangeType}
            label="type"
            name="type"
          >
            <MenuItem value="Completeness">Completeness</MenuItem>
            <MenuItem value="Late">Late</MenuItem>
          </Select>
        </FormControl>
        <DropzoneArea
          acceptedFiles={['image/*']}
          onChange={handleChange}
          showFileNames={true}
          maxFileSize={500800000}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              margin: 15,
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AttachFile;
