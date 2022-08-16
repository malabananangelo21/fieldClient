import React from "react";
import clsx from "clsx";
import "../../../../../src/App.css";
import { HashRouter as Router, Route, Redirect,Link } from "react-router-dom";
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
import axios from "axios";
import ImageIcon from "@material-ui/icons/Image";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
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
    background: "rgba(0,0,0,0.6)",
  },
  filterBox: {
    background: "rgba(0,0,0,0.7)",
  },
});

function ViewAttachment({ user_id, attach_data }) {
  const [state, setState] = React.useState({
    files: [],
    type: "",
    OpenPic:false,
    selectedPic:''
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

  React.useEffect(() => {
    getFile();
  }, []);
  const getFile = () => {
    let data = {
      user_id: user_id,
      date: moment(attach_data.jo_date_assign).format("YYYY-MM-DD"),
    };
    getData("tracking/getAttachFiles", data).then((res) => {
      console.log(res);
      setState({ ...state, files: res });
    });
  };
//   const download = (files) => {
      
//     const blob = new Blob(
//         [ file ],
//         { type: 'image/jpeg' }
//       );
//       const href = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = href;
//       link.download = 'your file name' + '.jpeg';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//   };

  return (
    <div style={{ height: 400,width:'100%'}}>
      <div style={{ display: "flex",flexDirection:'row'}}>
        {state.files.map((val, index) => {
          return (
            <div
              className="hover_file"
              onClick={()=>{setState({...state,OpenPic:true,selectedPic:val.file_name})}}
              key={index}
              style={{  cursor: "pointer",width: 180, height: 120,position:'relative',marginRight:10}}
            >
              <img
                src={
                  "http://images.pacificweb.com.ph/attachments/" + val.file_name
                }
                style={{ width: 180, height: 120, position: "absolute" }}
              />
              <div
                className="bg-details"
                style={{ width: 180, height: 120, position: "absolute" }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ImageIcon style={{ color: "#e74c3c" }} />
                  <Typography
                    style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}
                  >
                    {val.file_name}
                  </Typography>
                </div>
                {/* <div style={{position:'absolute',bottom:1,right:1}}>
                    <a href={"http://images.pacificweb.com.ph/attachments/" + val.file_name + "?force=true"} download>
                    <IconButton  aria-label="delete">
            <CloudDownloadIcon
              
              style={{ color: "#fff" }}
            />
          </IconButton>
                    </a>
                
                    </div> */}
           
              </div>
            </div>
          );
        })}
      </div>
      <Dialog
        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        fullWidth
        maxWidth="md"
        open={state.OpenPic}
        onClose={() => setState({ ...state, OpenPic: false })}
        aria-labelledby="responsive-dialog-title"
      >
          <div style={{ position: "absolute", zIndex: 2, left: 2, top: 1 ,display: "flex", flexDirection: "row",backgroundColor:'rgba(0,0,0,0.4)',width:'100%'}}>
          <IconButton aria-label="delete">
            <KeyboardBackspaceIcon
              onClick={(e) =>
                setState({
                  ...state,
                  OpenPic: false,
                })
              }
              style={{ color: "#fff" }}
            />
          </IconButton>
          <div style={{ display: "flex", flexDirection: "row",marginTop:10}}>
                  <ImageIcon style={{ color: "#e74c3c" }} />
                  <Typography
                    style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}
                  >
                    {state.selectedPic}
                  </Typography>
                 
                </div>
             
        </div>
          <div >
          <img
                src={
                  "http://images.pacificweb.com.ph/attachments/" + state.selectedPic
                }
                style={{ width: '100%', height: '100%' }}
              />
          </div>
      
      </Dialog>
    </div>
  );
}

export default ViewAttachment;
