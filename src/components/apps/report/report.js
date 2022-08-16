import DateFnsUtils from "@date-io/date-fns";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../App";
import useStyles from "../../../css/css";
import JOPIE from "./charts/piechart";
import { getReportAccomCounts } from "../Functions/home_func";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function Index() {
  const home_reducer = useSelector((state) => state.home_reducer);
  const classes = useStyles();
  const [selected_jo_type, setSelected_jo_type] = React.useState([]);
  const [state, setState] = React.useState({
    branch_id: "",
    date_start: new Date(),
    date_end: new Date(),
    open: false,
    modal_jo_type: false,
    business_area: [],
    jo_type: [],
    branch_name: "",
    pieData: []
  });
  const dispatch = useDispatch();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const handleListItemClick = (event, index, val) => {
    let jo_type = [];
    let match = false;
    selected_jo_type.map((va_data) => {
      if (va_data != val) {
        jo_type.push(va_data);
      } else {
        match = true;
      }
    });
    if (!match) {
      jo_type.push(val);
    }
    setSelected_jo_type(jo_type);
  };
  const onChangeCompany = (e) => {
    const branches = home_reducer.handleBranch.filter(
      (val) => val.company_id == e.target.value
    );
    dispatch_data("SelectedBranches", branches);
    setState({
      ...state,
      company: e.target.value,
    });
  };
  const onChangeBranch = (e) => {
    let jo_type = [];
    let ba = [];
    let branchname = "";
    home_reducer.SelectedBranches.map((val, index) => {
      if (val.branch_id === e.target.value) {
        if (val.branch_field_work !== "") {
          jo_type = JSON.parse(val.branch_field_work);
          ba = JSON.parse(val.business_area);
          branchname = val.branch_company;
        } else {
          jo_type = JSON.parse(val.branch_field_work);
          ba = [];
          branchname = val.branch_company;
        }
      }
    });
    setSelected_jo_type([])
    setState({
      ...state,
      selected_branch: e.target.value,
      jo_type: jo_type,
      business_area: ba,
      branch_name: branchname,
    });
  };
  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleClickOpen = () => {
    setState({
      ...state,
      open: true,
    });
  };
  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  const handleDateChangeStart = (date) => {
    setState({
      ...state,
      date_start: date,
    });
  };
  const handleDateChangeEnd = (date) => {
    setState({
      ...state,
      date_end: date,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      moment(state.date_start).format("YYYY-MM-DD") >
      moment(state.date_end).format("YYYY-MM-DD")
    ) {
      setState({
        ...state,
        alertError: true,
      });
    } else if (
      moment(state.date_start).format("YYYY") ===
      moment("2020-01-01").format("YYYY")
    ) {
      alert(
        "The accomplishments for the year 2020 you need to generate are on the archive. Please email us with any questions or concerns."
      );
    } else {
      dispatch_data("loader", true);
      let data = {
        date_filter: moment(state.date_start).format("YYYY-MM-DD"),
        date_filter_end: moment(state.date_end).format("YYYY-MM-DD"),
        branch: state.selected_branch,
        user_id: localStorage.getItem("u"),
        type: selected_jo_type,
        ba: state.selected_ba,
      };
        getReportAccomCounts(data).then((response) => {
          setState({
            ...state,
            pieData: response.pie,
          });
      });
    }
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Breadcrumbs aria-label="breadcrumb" style={{ margin: 10 }}>
            <Typography color="textPrimary">Home</Typography>
            <Typography color="textPrimary">Job Order Report</Typography>
            <Typography color="textPrimary">
              {moment(state.date_start).format("LL") +
                " - " +
                moment(state.date_end).format("LL")}
            </Typography>
            <Typography color="textPrimary">{state.branch_name}</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              handleClickOpen();
            }}
            style={{
              color: "white",
              backgroundColor: "rgba(6,86,147)",
              margin: 1,
            }}
            startIcon={<DashboardIcon />}
          >
            Generate
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.root} variant="outlined">
            <CardHeader
              title={state.branch_name + " " + "Job Order "}
              subheader={
                moment(state.date_start).format("ll") +
                " - " +
                moment(state.date_end).format("ll")
              }
            />
            <CardContent style={{ position: "relative", minHeight: 350 }}>
              <JOPIE PieInfo={state.pieData}/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Card className={classes.root} variant="outlined">
                <CardActionArea>
                  <CardContent>
                    <Typography color="textPrimary">
                      Accomplished J.O.
                    </Typography>
                    <TableContainer>
                      <Table className={classes.table} size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell style={{ borderStyle: "none" }}>
                              Business Area
                            </TableCell>
                            <TableCell
                              style={{ borderStyle: "none" }}
                              align="right"
                            >
                              100
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ borderStyle: "none" }}>
                              Business Area
                            </TableCell>
                            <TableCell
                              style={{ borderStyle: "none" }}
                              align="right"
                            >
                              100
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ borderStyle: "none" }}>
                              Business Area
                            </TableCell>
                            <TableCell
                              style={{ borderStyle: "none" }}
                              align="right"
                            >
                              100
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card className={classes.root} variant="outlined">
                <CardActionArea>
                  <CardContent>
                    <Typography color="textPrimary">Pending J.O.</Typography>
                    <TableContainer>
                      <Table className={classes.table} size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell style={{ borderStyle: "none" }}>
                              Business Area
                            </TableCell>
                            <TableCell
                              style={{ borderStyle: "none" }}
                              align="right"
                            >
                              100
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ borderStyle: "none" }}>
                              Business Area
                            </TableCell>
                            <TableCell
                              style={{ borderStyle: "none" }}
                              align="right"
                            >
                              100
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ borderStyle: "none" }}>
                              Business Area
                            </TableCell>
                            <TableCell
                              style={{ borderStyle: "none" }}
                              align="right"
                            >
                              100
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography color="textPrimary">Job Order</Typography>
                  <TableContainer>
                    <Table className={classes.table} size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ borderStyle: "none" }}>
                            Business Area
                          </TableCell>
                          <TableCell
                            style={{ borderStyle: "none" }}
                            align="right"
                          >
                            100
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ borderStyle: "none" }}>
                            Business Area
                          </TableCell>
                          <TableCell
                            style={{ borderStyle: "none" }}
                            align="right"
                          >
                            100
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ borderStyle: "none" }}>
                            Business Area
                          </TableCell>
                          <TableCell
                            style={{ borderStyle: "none" }}
                            align="right"
                          >
                            100
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Card className={classes.root} variant="outlined">
                <CardContent style={{ minHeight: 50 }}>
                  <Typography color="textPrimary">Findings</Typography>
                  <TableContainer>
                    <Table className={classes.table} size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ borderStyle: "none" }}>
                            Finding 1
                          </TableCell>
                          <TableCell
                            style={{ borderStyle: "none" }}
                            align="right"
                          >
                            100
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ borderStyle: "none" }}>
                            Finding 2
                          </TableCell>
                          <TableCell
                            style={{ borderStyle: "none" }}
                            align="right"
                          >
                            100
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ borderStyle: "none" }}>
                            Finding 3
                          </TableCell>
                          <TableCell
                            style={{ borderStyle: "none" }}
                            align="right"
                          >
                            100
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog fullWidth maxWidth="xs" open={state.open} onClose={handleClose}>
        <DialogTitle>Generate Dashboard</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                  <KeyboardDatePicker
                    id="date-picker-dialog"
                    label="Filter Date Start"
                    format="MM-dd-yyyy"
                    name="date_start"
                    value={state.date_start}
                    style={{ width: "100%" }}
                    onChange={handleDateChangeStart}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} md={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                  <KeyboardDatePicker
                    id="date-picker-dialog"
                    label="Filter Date End"
                    format="MM-dd-yyyy"
                    name="date_end"
                    value={state.date_end}
                    style={{ width: "100%" }}
                    onChange={handleDateChangeEnd}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl
                  required
                  size="small"
                  className={classes.formControl}
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
                  required
                  size="small"
                  className={classes.formControl}
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
              <Grid item xs={12} md={12}>
                <FormControl
                  required
                  className={classes.formControl}
                  onClick={() => setState({ ...state, modal_jo_type: true })}
                >
                  <InputLabel shrink htmlFor="select-multiple-native">
                    Select Type
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    value={selected_jo_type}
                    // onChange={handleChange}

                    input={<Input />}
                    MenuProps={MenuProps}
                    disabled
                  >
                    {state.jo_type.map((val, index) => (
                      <MenuItem key={index} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl
                  required
                  size="small"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Select Business Area
                  </InputLabel>
                  <Select name="selected_ba" onChange={onChange}>
                    <MenuItem value="ALL">All</MenuItem>
                    {state.business_area.length === 0
                      ? undefined
                      : state.business_area.map((val) => {
                          return <MenuItem value={val}>{val}</MenuItem>;
                        })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
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
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.modal_jo_type}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Select Type</DialogTitle>
        <DialogContent>
          <form>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <List component="nav" aria-label="main mailbox folders">
                      {state.jo_type.map((val, index) => {
                        let check = false;
                        let match = selected_jo_type.filter(
                          (type) => type === val
                        );
                        if (match.length > 0) {
                          check = true;
                        }
                        return (
                          <>
                            <Divider />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={check}
                                  onChange={(event) => {
                                    handleListItemClick(event, index, val);
                                  }}
                                  name="checkedB"
                                  color="primary"
                                />
                              }
                              label={val.toUpperCase()}
                            />
                          </>
                        );
                      })}
                      <Divider />
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setState({ ...state, modal_jo_type: false })}
            color="primary"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Index;
