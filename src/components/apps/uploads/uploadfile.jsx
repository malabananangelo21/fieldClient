import DateFnsUtils from "@date-io/date-fns";
import AppBar from "@material-ui/core/AppBar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { DropzoneArea } from "material-ui-dropzone";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import readXlsxFile from "read-excel-file";
import useStyles from "../../../css/css";
import { getData } from "../../api/api";
import { useSelector, useDispatch } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Mapv2() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const blmcData = useSelector((state) => state.Mapdash);
  const loginR = useSelector((state) => state.Login);
  const home_reducer = useSelector((state) => state.home_reducer);
  const map_reducer = useSelector((state) => state.map_reducer);
  const assigning_reducer = useSelector((state) => state.assigning_reducer);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [state, setState] = React.useState({
    customerTableLoad: false,
    loading: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    customers: [],
    accompData: [],
    date_start: moment(new Date()).format("YYYY-MM-DD"),
    fieldman: 0,
    mru: "",
    fileAdded: [],
  });

  const [dialog, setDialog] = React.useState({
    updateOpen: false,
    addOpen: false,
    deleteOpen: false,
  });
  const textchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const customerDataTableColumn = [
    { id: "id", label: "#" },
    { id: "meterNum", label: "Meter Number" },
    { id: "type", label: "Type" },
    { id: "prevRdg", label: "Previous Reading" },
    { id: "presRdg", label: "Present Reading" },
    { id: "consumption", label: "consumption" },
    // { id: 'action', label: 'Action'},
  ];

  const handleDateChangeStart = (date) => {
    // console.log(date);
    setState({
      ...state,
      date_start: moment(new Date(date)).format("YYYY-MM-DD"),
    });
  };

  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };

  useEffect(() => {
    dispatch_data("accomplishments_map", []);
    // getCustomer();
    handleGetFieldmen();
  }, []);

  function customerTableData(
    id,
    meterNum,
    type,
    prevRdg,
    presRdg,
    consumption
  ) {
    return { id, meterNum, type, prevRdg, presRdg, consumption };
  }

  const analyzeData = (e) => {
    e.preventDefault();
    setLoading(!loading);

    readXlsxFile(state.fileAdded[0]).then((row) => {
      const data = [];
      for (let i = 1; i < row.length; i++) {
        data.push({
          fieldman: state.fieldman,
          address: row[i][0],
          clientName: row[i][1],
          meterNum: row[i][2],
          branch_id: branches.Selected_branch,
          company_id: branches.Selectedcompany,
          accom_jo_type: "Reading",
          metertype: row[i][3],
          prevRdg: row[i][4],
          presRdg: row[i][5],
          mru: state.mru,
          consumption: row[i][5] - row[i][4],
          fieldFindings: row[i][11],
          time:
            state.date_start +
            " " +
            moment("2021-05-12" + " " + row[i][6]).format("HH:mm:ss"),
          //time: row[i][6]
        });
      }
      // console.log(data)
      getData("blmc/uploadMRData", data).then((result) => {
        // console.log(result);
        setState({
          ...state,
          accompData: data,
        });
        setLoading(false);
        handleClose();
      });
    });
  };
  const [branches, setBranches] = useState({
    branches: [],
    companies: [],
    filteredBranch: [],
    Selectedcompany: 0,
    Selected_branch: 0,
  });

  const uploadAndConvert = (files) => {
    // console.log(files[0])
    setState({
      ...state,
      fileAdded: files,
    });
  };

  const onChangeCompany = (e) => {
    const branches_data = home_reducer.handleBranch.filter(
      (val) => val.company_id == e.target.value
    );
    branches_data.sort(function (a, b) {
      return a["branch_name"].localeCompare(b["branch_name"]);
    });

    const filteredFieldmen = dispatch_data("SelectedBranches", branches_data);
    setBranches({
      ...branches,
      Selectedcompany: e.target.value,
    });
  };

  const [filteredFieldmen, setFilteredFielmen] = useState([]);

  const onChangeBranch = (e) => {
    const fieldmen = assigning_reducer.fieldman_list.filter(
      (row) => e.target.value == row.bid
    );

    // console.log(fieldmen);

    setFilteredFielmen(fieldmen);
    setBranches({
      ...branches,
      Selected_branch: e.target.value,
    });
  };

  const handleGetFieldmen = () => {
    getData("Audit/getFieldman", { user_id: localStorage.getItem("u") }).then(
      (response) => {
        dispatch_data("fieldman_list", response);
      }
    );
  };

  const handleSelectFieldmen = (e) => {
    setState({
      ...state,
      fieldman: e.target.value,
    });
  };

  const updateDialog = () => {
    return (
      <Dialog fullScreen open={dialog.updateOpen} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              style={{
                position: "absolute",
                right: 0,
              }}
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Dialog>
    );
  };

  const addDialog = () => {
    return (
      <Dialog
        open={dialog.addOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={analyzeData}>
          <DialogTitle id="alert-dialog-title">{"Upload Data"}</DialogTitle>
          <DialogContent>
            <Grid item xs={12} md={12}>
              <FormControl
                size="small"
                className={classes.formControl}
                style={{ width: "100%" }}
                required
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Company
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={onChangeCompany}
                  label="Company"
                  name="company"
                  value={branches.Selectedcompany}
                  required
                >
                  {home_reducer.company_name.map((val) => {
                    return (
                      <MenuItem value={val.company_id}>
                        {val.company_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl
                size="small"
                className={classes.formControl}
                style={{ width: "100%" }}
                required
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Branch
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={onChangeBranch}
                  label="branch"
                  name="branch_id"
                  value={branches.Selected_branch}
                  required
                >
                  {home_reducer.SelectedBranches.map((val, index) => {
                    return (
                      <MenuItem value={val.branch_id}>
                        {val.branch_company}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControl
                size="small"
                className={classes.formControl}
                style={{ marginRight: 10 }}
                required
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Fieldman
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={handleSelectFieldmen}
                  required
                  label="branch"
                  name="branch_id"
                  value={state.selected_jobOrder}
                  required
                >
                  {filteredFieldmen.map((val, index) => {
                    return (
                      <MenuItem value={val.user_id}>
                        {String(
                          val.user_lname +
                            " " +
                            val.user_fname +
                            " " +
                            val.user_mname
                        ).toLocaleUpperCase()}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <div style={{ marginBottom: 10, marginTop: 10 }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                <KeyboardDatePicker
                  id="date-picker-dialog"
                  label="Reading Date"
                  format="MM-dd-yyyy"
                  name="date_start"
                  value={state.date_start}
                  style={{ width: "100%" }}
                  onChange={handleDateChangeStart}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  required
                />
              </MuiPickersUtilsProvider>
            </div>
            <DropzoneArea
              className={classes.drop_zone_area}
              acceptedFiles={[
                ".csv,.xlsx,text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values",
              ]}
              onChange={uploadAndConvert}
              showFileNames={true}
              maxFileSize={50080000}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" autoFocus>
              Upload
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };
  const handleClose = () => {
    setDialog({ updateOpen: false });
  };

  const skeleton = () => {
    return (
      <TableRow>
        <TableCell>
          {" "}
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          {" "}
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          {" "}
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          {" "}
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          {" "}
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          {" "}
          <Skeleton variant="text" />
        </TableCell>
      </TableRow>
    );
  };

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };


  const [loading, setLoading] = React.useState(false);
 

  return (
    <div className={classes.root}>
      <Backdrop style={{zIndex:9999}}open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <NotificationContainer />
      <Breadcrumbs aria-label="breadcrumb" gutterBottom>
        <Typography color="textPrimary">Always</Typography>
        <Typography color="textPrimary">Customers</Typography>
      </Breadcrumbs>
      {/* <NotificationContainer /> */}
      {/* <Initial_cards /> */}
      <Fab
        style={{
          position: "absolute",
          top: 90,
          right: 45,
        }}
        color="primary"
        aria-label="add"
        onClick={() => setDialog({ addOpen: true })}
      >
        <AddIcon />
      </Fab>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" className={classes.title}>
                Analyze Table
              </Typography>
              <Paper>
                <TableContainer
                  className={classes.container}
                  style={{ maxHeight: 385 }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead style={{ backgroundColor: "#3498db" }}>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Meter Number</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Previous Reading</TableCell>
                        <TableCell>Present Reading</TableCell>
                        <TableCell>Consumption</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.accompData.length == 0
                        ? state.loading.map((load) => skeleton())
                        : state.accompData
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={row.code}
                                >
                                  {customerDataTableColumn.map((column) => {
                                    const value = row[column.id];
                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                      >
                                        {column.format &&
                                        typeof value === "number"
                                          ? column.format(value)
                                          : value}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={state.accompData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {updateDialog()}
      {addDialog()}
    </div>
  );
}
