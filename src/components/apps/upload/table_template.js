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
import { DropzoneArea } from "material-ui-dropzone";
import Paper from "@material-ui/core/Paper";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { getData, getDataDiscon } from "../../api/api";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    maxWidth: window.innerWidth * 0.8,
  },
  tableCell: {
    width: 150,
    height: 36,
    backgroundColor: "#fff",
    borderColor: "#b2bec3",
    borderWidth: 0.5,
    marginRight: 5,
  },
}));
function InputData({ edit, refreshRemove, val, onChangeText }) {
  const [inputValue, setInputValue] = React.useState(val.column_value);

  React.useEffect(() => {
    setInputValue(val.column_value);
  }, [refreshRemove]);

  return (

    <input
      // disabled={!edit ? true : false}
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
        onChangeText(e);
      }}
    />

  );
}
function SelectData({
  refreshRemove,
  hearderFields,
  classes,
  onSelect,
  row,
  index,
  edit,
}) {
  const [inputValue, setInputValue] = React.useState(row.header);

  React.useEffect(() => {
    setInputValue(row.header);
  }, [refreshRemove]);

  return (
    <select
      disabled={!edit ? true : false}
      required
      onChange={(e) => {
        setInputValue(e.target.value);
        onSelect(e, index);
      }}
      className={classes.tableCell}
      value={inputValue}
    >
      <option value="" disabled selected>
        Select
      </option>
      <option value="excluded">--Excluded--</option>
      {hearderFields.map((val) => {
        return (
          <option value={val.category_field}>{val.category_details}</option>
        );
      })}
    </select>
  );
}
function Index({
  upload_data,
  refresh_table_template,
  template_status,
  dynamicHeader,
  branch_id,
  company_id,
  ba,
  jo_type,
  cancelTemplate,
  date_start_val,
  file_name
}) {
  const home_reducer = useSelector((state) => state.home_reducer);
  const classes = styles();
  const dispatch = useDispatch();

  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const [state, setState] = React.useState({
    selected_company: "",
    selected_branch: "",
    branches: [],
    jo_type: [],
    date_start_val: new Date(),
    selected_jo_type: "",
    header: [],
    hearderFields: [],
    columnAdd: [],
    refreshRemove: false,
    edit: false,
  });
  let id = 0;
  function createData(name, calories, fat, carbs, protein, x, y) {
    id += 1;
    return { id, name, calories, fat, carbs, protein, x, y };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 1, 2),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 1, 2),
    createData("Eclair", 262, 16.0, 24, 6.0, 1, 2),
    createData("Cupcake", 305, 3.7, 67, 4.3, 1, 2),
    createData("Gingerbread", 356, 16.0, 49, 3.9, 1, 2),
  ];
  useEffect(() => {
    getHeaderData();
  }, [refresh_table_template]);
  const getHeaderData = () => {
    getData("tracking/GetUploadHeaderCategories2", { branch_id: branch_id, jo_type: jo_type, ba: ba }).then((res) => {
      let header = [];
      let edit = false;
      let dynamicHeaderData = []
      for (let index = 0; index < res.headers.length; index++) {
        dynamicHeaderData = JSON.parse(res.headers[index].header_details)
      }
      if (dynamicHeaderData.length > 0) {
        console.log(dynamicHeaderData.length)
        console.log(upload_data)


        if (upload_data.length > 0) {
          if (dynamicHeaderData.length !== upload_data[0].length) {

            edit = true;
            upload_data.map((row, index) => {
              if (index === 1) {
                row.map((val) => {
                  let data = {
                    header: "",
                    type: "",
                    column_value: "",
                  };
                  header.push(data);
                });
              }
            });
          } else {
            header = dynamicHeaderData;
          }
        }
      } else {
        upload_data.map((row, index) => {
          if (index === 1) {
            row.map((val) => {
              let data = {
                header: "",
                type: "",
                column_value: "",
              };
              header.push(data);
            });
          }
        });
        edit = true;
      }

      res.data.sort(function (a, b) {
        return a["category_details"].localeCompare(b["category_details"]);
      })
      setState({
        ...state,
        hearderFields: res.data,
        header: header,
        edit: edit,
      });
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      header_details: JSON.stringify(state.header),
      company_id: company_id,
      branch_id: branch_id,
      BA: ba,
      user_id: localStorage.getItem("u"),
      date_added: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      jo_type: jo_type,
    };
    dispatch_data("LoadingIndex", true)
    getData("Schedule/saveHeader", data).then((res) => {
      setState({ ...state, edit: false });
      dispatch_data("LoadingIndex", false)
    });
  };
  const saveHeader = () => { };
  const onSelect = (e, index) => {
    state.header[index]["header"] = e.target.value;
    setState({ ...state });
  };
  const addColumn = () => {
    let data = {
      header: "",
      type: "Add",
      column_value: "",
    };
    state.header.push(data);
    setState({ ...state });
  };
  const Remove = (index) => {
    state.header.splice(index, 1);
    setState({ ...state, refreshRemove: !state.refreshRemove });
  };
  const UploadFile = () => {
    let new_upload_data = [];
    let upload = true
    let data_file = {
      file_name: file_name,
      user_id: localStorage.getItem('u'),
      branch_id: branch_id,
      upload_type: jo_type,
      date_implement: moment(date_start_val).format('YYYY-MM-DD')
    }
    console.log(upload_data)
    console.log(state.header)

    upload_data.map((val, index) => {
      if (index > 0) {
        let data = {};
        data['bid'] = branch_id;
        data['BA'] = ba;
        data['upload_type'] = jo_type;
        data['date_filter'] = moment(date_start_val).format('YYYY-MM-DD');
        state.header.map((row, index_row) => {

          let column_value = "";
          let header = row.header;
          if (row.type === "") {
            column_value = val[index_row];
          } else {
            column_value = row.column_value;
          }
          if (header === "") {
            upload = false
          }

          if (header !== "excluded") {
            data[header] = column_value;
          }
        });
        new_upload_data.push(data);
      }
    });
    if (upload) {
      dispatch_data("LoadingIndex", true)
      getData("Schedule/uploadDynamicData", { file: data_file, data: new_upload_data, type: 'Job Orders' }).then((res) => {
        if (res === true) {
          cancelTemplate();
        }
        dispatch_data("LoadingIndex", false)

      })
    } else {
      alert('Please create a template')
    }

  };

  return (
    <Grid item xs={12} md={12}>
      <Paper
        className={classes.root}
        variant={"outlined"}
        style={{ padding: 10, minHeighhet: 230, width: "100%" }}
      >
        {template_status !== "" ? (
          <form onSubmit={onSubmit}>
            <TableContainer className={classes.table}>
              <Table>
                <TableHead
                  style={{ backgroundColor: "rgba(6,86,147)", color: "#fff" }}
                >
                  <TableRow>
                    {state.header.map((row, index) => {
                      return (
                        <TableCell>
                          <div style={{ position: "relative" }}>
                            <SelectData
                              refreshRemove={state.refreshRemove}
                              hearderFields={state.hearderFields}
                              classes={classes}
                              onSelect={onSelect}
                              row={row}
                              index={index}
                              edit={state.edit}
                            />
                            {row.type === "Add" ? (
                              state.edit ? (
                                <RemoveCircleIcon
                                  onClick={() => Remove(index)}
                                  style={{
                                    position: "absolute",
                                    right: 12,
                                    top: -10,
                                    color: "#fff",
                                    borderRadius: 22 / 2,
                                    width: 22,
                                    height: 22,
                                    backgroundColor: "rgba(6,86,147)",
                                  }}
                                />
                              ) : undefined
                            ) : undefined}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upload_data.map((row, index) => {
                    if (index <= 1)
                      return (
                        <TableRow key={row.id}>
                          {row.map((val) => {
                            return (
                              <TableCell component="th" scope="row">
                                {val}
                              </TableCell>
                            );
                          })}
                          {state.header.map((val) => {
                            console.log(val);
                            if (val.type !== "")
                              return (
                                <TableCell component="th" scope="row">
                                  {index === 1 ? (
                                    state.edit ?
                                      <InputData
                                        edit={state.edit}
                                        refreshRemove={state.refreshRemove}
                                        val={val}
                                        onChangeText={(e) => {
                                          val.column_value = e.target.value;
                                          setState({ ...state });
                                        }}
                                      /> : val.column_value
                                  ) : undefined}
                                </TableCell>
                              );
                          })}
                          {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                      );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              {state.edit ? (
                <>
                  <Button
                    onClick={() => {
                      setState({ ...state, edit: false });
                    }}
                    type="button"
                    size="medium"
                    variant="contained"
                    style={{
                      backgroundColor: "rgba(6,86,147)",
                      color: "white",
                      marginRight: 5,
                    }}
                    className={classes.button}
                    startIcon={<CancelIcon />}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    size="medium"
                    variant="contained"
                    style={{
                      backgroundColor: "rgba(6,86,147)",
                      color: "white",
                      marginRight: 5,
                    }}
                    onClick={() => addColumn()}
                    className={classes.button}
                    startIcon={<AddCircleIcon />}
                  >
                    Column
                  </Button>
                  <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    style={{
                      backgroundColor: "rgba(6,86,147)",
                      color: "white",
                      marginRight: 5,
                    }}
                    className={classes.button}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      cancelTemplate();
                    }}
                    type="button"
                    size="medium"
                    variant="contained"
                    style={{
                      backgroundColor: "rgba(6,86,147)",
                      color: "white",
                      marginRight: 5,
                    }}
                    className={classes.button}
                    startIcon={<CancelIcon />}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setState({ ...state, edit: true });
                    }}
                    type="button"
                    size="medium"
                    variant="contained"
                    style={{
                      backgroundColor: "rgba(6,86,147)",
                      color: "white",
                      marginRight: 5,
                    }}
                    className={classes.button}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      UploadFile();
                    }}
                    type="button"
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
                    Upload
                  </Button>
                </>
              )}
            </div>
          </form>
        ) : (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Typography style={{ fontSize: 17, color: "#bdc3c7" }}>
              *** Template ***
            </Typography>
          </div>
        )}
      </Paper>
    </Grid>
  );
}

export default Index;
