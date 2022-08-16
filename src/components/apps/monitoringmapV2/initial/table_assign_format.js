import React, { PureComponent, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardContent,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Divider,
  TableBody,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  InputLabel,
  TextField,
  TableContainer,
  MenuItem,
  Paper,
  TablePagination,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Pie from "./charts/pie";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import FilterListIcon from "@material-ui/icons/FilterList";
import ReorderIcon from "@material-ui/icons/Reorder";
import Slide from "@material-ui/core/Slide";
import Filter from "./filter";
import CloseIcon from "@material-ui/icons/Close";
import { getData, cancelRequest } from "../../../api/api";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import axios from "axios";
import RefreshIcon from "@material-ui/icons/Refresh";
import Summary_monitoring from "./summary_monitoring";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import AutoComplete from "./autocomplete";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import GetAppIcon from "@material-ui/icons/GetApp";
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const MuiTableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(TableCell);
let counterError = 0;
const columns = [
  { id: "compelete_name", label: "Name" },
  { id: "date", label: "Date" },
  { id: "city", label: "City" },
  { id: "barangay", label: "Barangay" },
  { id: "description", label: "Street" },
  { id: "allowance", label: "Allowance" },
  { id: "Total", label: "TOTAL" },
  { id: "SOA", label: "SOA" },
  { id: "DN", label: "DN" },
  { id: "RE-OUT SOA", label: "RSOA" },
  { id: "RE-OUT DN", label: "RDN" },
  { id: "AUBD", label: "AUBD" },
  { id: "MECO", label: "MECO" },
  { id: "NAC", label: "NAC" },
  { id: "NCR", label: "NCR" },
  { id: "OSB", label: "OSB" },
  { id: "OSN", label: "OSN" },
];

const columns2 = [
  { id: "Total", label: "TOTAL" },
  { id: "SOA", label: "SOA" },
  { id: "DN", label: "DN" },
  { id: "RE-OUT SOA", label: "RSOA" },
  { id: "RE-OUT DN", label: "RDN" },
  { id: "AUBD", label: "AUBD" },
  { id: "MECO", label: "MECO" },
  { id: "NAC", label: "NAC" },
  { id: "NCR", label: "NCR" },
  { id: "OSB", label: "OSB" },
  { id: "OSN", label: "OSN" },
];

const formatNumber = (num) => {
  if (num != "") {
    let num2 = parseFloat(num);
    return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    return 0;
  }
};
function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 350,
  },
});
const StickyHeadTable = ({ trackAssignedData, branch_name, indexState }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let EmployeeSearch = trackAssignedData.filter((files) => {
    return (
      (files.compelete_name !== null &&
        files.compelete_name !== "" &&
        typeof files.compelete_name !== "undefined" &&
        files.compelete_name
          .toLowerCase()
          .indexOf(search.toLocaleLowerCase()) !== -1) ||
      (files.barangay !== null &&
        files.barangay !== "" &&
        typeof files.barangay !== "undefined" &&
        files.barangay.toLowerCase().indexOf(search.toLocaleLowerCase()) !==
          -1) ||
      (files.description !== null &&
        files.description !== "" &&
        typeof files.description !== "undefined" &&
        files.description.toLowerCase().indexOf(search.toLocaleLowerCase()) !==
          -1)
    );
  });
  React.useEffect(() => {
    setPage(0);
  }, [search]);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <TextField
          style={{ width: "100%" }}
          size="small"
          label="Search Name/Brgy/Street"
          variant="outlined"
          onChange={(e) => {
            let data = e.target.value;
            setSearch(data);
          }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <ExcelFile
          filename={
            "Assigned Job Order" +
            "-" +
            branch_name +
            " " +
            indexState.date_start +
            " - " +
            indexState.date_end
            // moment(new Date(state.filter_date_start)).format("YYYY-MM-DD") + ' - ' + moment(new Date(state.filter_date_end)).format("YYYY-MM-DD")
          }
          element={
            <Button
              size="medium"
              variant="contained"
              style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
              className={classes.button}
              endIcon={<GetAppIcon />}
            >
              Download
            </Button>
          }
        >
          <ExcelSheet data={EmployeeSearch} name="Invalid">
            <ExcelColumn label="Name" value="compelete_name" />
            <ExcelColumn label="Date" value="date" />
            <ExcelColumn label="City" value="city" />
            <ExcelColumn label="Barangay" value="barangay" />
            <ExcelColumn label="Allowance" value="allowance" />
            <ExcelColumn label="SOA" value="SOA" />
            <ExcelColumn label="DN" value="DN" />
            <ExcelColumn label="RE-OUT SOA" value="RE-OUT SOA" />
            <ExcelColumn label="RE-OUT DN" value="RE-OUT DN" />
            <ExcelColumn label="AUBD" value="AUBD" />
            <ExcelColumn label="MECO" value="MECO" />
            <ExcelColumn label="NAC" value="NAC" />
            <ExcelColumn label="NCR" value="NCR" />
            <ExcelColumn label="OSB" value="OSB" />
            <ExcelColumn label="OSN" value="OSN" />
          </ExcelSheet>
        </ExcelFile>
      </Grid>
      <Grid item xs={12} md={12}>
        <Paper className={classes.root} variant="outlined">
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {/* <TableCell
                                        style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }}
                                    >
                                        #
                                    </TableCell> */}
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        fontSize: 12,
                        textAlign: "center",
                        color: "#fff",
                        backgroundColor: "#2a5793",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {EmployeeSearch.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((row, index) => {
                  console.log(row);
                  return (
                    <TableRow
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        let getFilter = sessionStorage.getItem(
                          "onSelectSingleDateGraph"
                        );
                        let dataList = [];
                        if (getFilter != null) {
                          dataList = JSON.parse(getFilter);
                        }
                        dataList.from = row.date;
                        dataList.to = row.date;

                        sessionStorage.setItem(
                          "onSelectSingleDateGraph",
                          JSON.stringify(dataList)
                        );
                        sessionStorage.setItem(
                          "searchName",
                          row.compelete_name
                        );

                        window.open(
                          "https://client.fieldplus.gzonetechph.com/#/map",
                          "_blank"
                        );
                      }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {/* <TableCell>
                                                 {index+1}
                                                 </TableCell> */}
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
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
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={EmployeeSearch.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

const TypeBills = ({ trackAssignedData }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12}>
        <Paper className={classes.root} variant="outlined">
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns2.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        fontSize: 12,
                        textAlign: "center",
                        color: "#fff",
                        backgroundColor: "#2a5793",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                      backgroundColor: "#27ae60",
                      color: "#fff",
                    }}
                  >
                    {formatNumber(
                      trackAssignedData.reduce(
                        (count, val) => (count += val.Total),
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    {formatNumber(
                      trackAssignedData.reduce(
                        (count, val) => (count += val.SOA),
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    {formatNumber(
                      trackAssignedData.reduce(
                        (count, val) => (count += val.DN),
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    {formatNumber(
                      trackAssignedData.reduce(
                        (count, val) => (count += val["RE-OUT SOA"]),
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    {formatNumber(
                      trackAssignedData.reduce(
                        (count, val) => (count += val["RE-OUT DN"]),
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    {formatNumber(
                      trackAssignedData.reduce(
                        (count, val) => (count += val["AUBD"]),
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    {formatNumber(
                      trackAssignedData.reduce(
                        (count, val) => (count += val["MECO"]),
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    {formatNumber(
                      trackAssignedData.reduce(
                        (count, val) => (count += val["NAC"]),
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    {formatNumber(
                      trackAssignedData.reduce(
                        (count, val) => (count += val["NCR"]),
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    {formatNumber(
                      trackAssignedData.reduce(
                        (count, val) => (count += val["OSB"]),
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    {formatNumber(
                      trackAssignedData.reduce(
                        (count, val) => (count += val["OSN"]),
                        0
                      )
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};
const Allowance = ({ trackAssignedData }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12}>
        <Paper className={classes.root} variant="outlined">
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 12,
                      color: "#fff",
                      backgroundColor: "#2a5793",
                    }}
                  >
                    Total Allowance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    {formatNumber(
                      trackAssignedData.reduce((count, val) => {
                        if (val.allowance != null) {
                          count += parseFloat(val.allowance);
                        }
                        return count;
                      }, 0)
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};
const Attendance = ({ array_dashboard_data, fieldman }) => {
  console.log(array_dashboard_data);
  const classes = useStyles();
  let count2 = array_dashboard_data.reduce((count, val) => {
    if (val.type == "PRESENT" || val.type == "ABSENT") {
      count += val.data.length;
    }
    return count;
  }, 0);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12}>
        <Paper className={classes.root} variant="outlined">
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 12,
                      color: "#fff",
                      backgroundColor: "#2a5793",
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 12,
                      color: "#fff",
                      backgroundColor: "#2a5793",
                    }}
                  >
                    Present
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 12,
                      color: "#fff",
                      backgroundColor: "#2a5793",
                    }}
                  >
                    Absent
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 12,
                      color: "#fff",
                      backgroundColor: "#2a5793",
                    }}
                  >
                    Assigned
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                      backgroundColor: "#27ae60",
                      color: "#fff",
                    }}
                  >
                    {count2}
                  </TableCell>
                  {array_dashboard_data.map((val, index) => {
                    if (val.type == "PRESENT")
                      return (
                        <TableCell
                          key={index}
                          style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            textAlign: "center",
                          }}
                        >
                          {val.data.length}
                        </TableCell>
                      );
                  })}
                  {array_dashboard_data.map((val, index) => {
                    if (val.type == "ABSENT")
                      return (
                        <TableCell
                          key={index}
                          style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            textAlign: "center",
                          }}
                        >
                          {val.data.length}
                        </TableCell>
                      );
                  })}
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    {parseInt(
                      fieldman.reduce((count, val) => {
                        if (
                          parseInt(val.user_delete_id) === 0 &&
                          val.count > 0
                        ) {
                          count++;
                        }
                        return count;
                      }, 0)
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};
const AttendanceList = ({ array_dashboard_data }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12}>
        <Paper className={classes.root} variant="outlined">
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 12,
                      color: "#fff",
                      backgroundColor: "#2a5793",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: 12,
                      color: "#fff",
                      backgroundColor: "#2a5793",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {array_dashboard_data.map((val, index) => {
                  if (val.type == "PRESENT")
                    return (
                      <>
                        {val.data.map((val2, index2) => {
                          console.log(val2);
                          return (
                            <TableRow key={index}>
                              <TableCell style={{}}>
                                {val2.completename}
                              </TableCell>
                              <TableCell
                                style={{
                                  backgroundColor: "green",
                                  color: "#fff",
                                }}
                              >
                                {"PRESENT"}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </>
                    );
                })}
                {array_dashboard_data.map((val, index) => {
                  if (val.type == "ABSENT")
                    return (
                      <>
                        {val.data.map((val2, index2) => {
                          console.log(val2);
                          return (
                            <TableRow key={index}>
                              <TableCell style={{}}>
                                {val2.completename}
                              </TableCell>
                              <TableCell
                                style={{
                                  backgroundColor: "red",
                                  color: "#fff",
                                }}
                              >
                                {"ABSENT"}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </>
                    );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};
const TableAssignFormat = forwardRef((props, ref) => {
  const { state, setState, fieldman_map, branch_name } = props;
  const [indexState, setIndexState] = React.useState({
    date_start: moment(new Date()).format("YYYY-MM-DD"),
    date_end: moment(new Date()).format("YYYY-MM-DD"),
    trackAssignedData: [],
    totalJoAssign: [],
  });
  const dispatch = useDispatch();

  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };

  const handleDateChangeStart = (date) => {
    setIndexState((prev) => ({
      ...prev,
      date_start: moment(date).format("YYYY-MM-DD"),
    }));
  };

  const handleDateChangeEnd = (date) => {
    setIndexState((prev) => ({
      ...prev,
      date_end: moment(date).format("YYYY-MM-DD"),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getAssignedLocation();
  };

  const getAssignedLocation = () => {
    let onSelectData = sessionStorage.getItem("onSelectSingleDateGraph");
    let selected_data = [];
    if (onSelectData !== null) {
      selected_data = JSON.parse(onSelectData);
      selected_data.from = moment(indexState.date_start).format("YYYY-MM-DD");
      selected_data.to = moment(indexState.date_end).format("YYYY-MM-DD");
    }

    if (typeof selected_data.jo_type != "undefined") {
      dispatch_data("loading_map", true);
      getData("aam/getAssignedLocation", selected_data).then((res) => {
        let data = res.res;
        let new_data = [];
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          let total =
            element["AUBD"] +
            element["DN"] +
            element["MECO"] +
            element["NAC"] +
            element["NCR"] +
            element["OSB"] +
            element["OSN"] +
            element["RE-OUT DN"] +
            element["RE-OUT SOA"] +
            element["SOA"];
          element["Total"] = total;
          new_data.push(element);
        }
        setIndexState((prev) => ({
          ...prev,
          trackAssignedData: new_data,
          totalJoAssign: res.get_data_total,
        }));
        dispatch_data("loading_map", false);
      });
    }
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined" style={{ padding: 10 }}>
                <Typography style={{ color: "#2a5793", fontWeight: "bold" }}>
                  Total
                </Typography>
                <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
                  {formatNumber(
                    indexState.totalJoAssign.reduce((count, val) => {
                      if (val.jo_count != null) {
                        count += parseInt(val.jo_count);
                      }
                      return count;
                    }, 0)
                  )}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined" style={{ padding: 10 }}>
                <Typography style={{ color: "#2a5793", fontWeight: "bold" }}>
                  Assigned
                </Typography>
                <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
                  {formatNumber(
                    indexState.trackAssignedData.reduce((count, val) => {
                      if (val.Total != null) {
                        count += parseInt(val.Total);
                      }
                      return count;
                    }, 0)
                  )}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined" style={{ padding: 10 }}>
                <Typography style={{ color: "#2a5793", fontWeight: "bold" }}>
                  Remaining
                </Typography>
                <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
                  {formatNumber(
                    indexState.totalJoAssign.reduce((count, val) => {
                      if (val.jo_count != null) {
                        count += parseInt(val.jo_count);
                      }
                      return count;
                    }, 0) -
                      indexState.trackAssignedData.reduce((count, val) => {
                        if (val.Total != null) {
                          count += parseInt(val.Total);
                        }
                        return count;
                      }, 0)
                  )}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="flex-end" item xs={12} md={6}>
          <form onSubmit={onSubmit}>
            <MuiPickersUtilsProvider
              variant="outlined"
              utils={DateFnsUtils}
              size="small"
            >
              <KeyboardDatePicker
                autoOk
                label="Date Start"
                format="MM/dd/yyyy"
                value={indexState.date_start}
                InputAdornmentProps={{ position: "end" }}
                onChange={handleDateChangeStart}
                style={{ marginLeft: 5 }}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider
              variant="outlined"
              utils={DateFnsUtils}
              size="small"
            >
              <KeyboardDatePicker
                autoOk
                label="Date End"
                format="MM/dd/yyyy"
                value={indexState.date_end}
                InputAdornmentProps={{ position: "end" }}
                onChange={handleDateChangeEnd}
                style={{ marginLeft: 5 }}
              />
            </MuiPickersUtilsProvider>
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
          </form>
        </Grid>
        <Grid item xs={12} md={12}>
          <StickyHeadTable
            trackAssignedData={indexState.trackAssignedData}
            branch_name={branch_name}
            indexState={indexState}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <TypeBills trackAssignedData={indexState.trackAssignedData} />
        </Grid>
        <Grid item xs={12} md={2}>
          <Allowance trackAssignedData={indexState.trackAssignedData} />
        </Grid>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={12}>
          <hr />
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
            {" "}
            {moment(state.date_display).format("LL")}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Attendance
            array_dashboard_data={state.array_dashboard_data}
            fieldman={state.fieldman}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AttendanceList array_dashboard_data={state.array_dashboard_data} />
        </Grid>
      </Grid>
    </div>
  );
});
export default React.memo(TableAssignFormat);
