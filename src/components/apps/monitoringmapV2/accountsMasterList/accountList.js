import React, { PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  TextField,
  CardContent,
  Card
} from "@material-ui/core";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { getData } from "../../../api/api";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import BarChartIcon from "@material-ui/icons/BarChart";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import Carousel from "react-material-ui-carousel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import "../css/home.css";
import "./accounts.css";
import Map from "../monitoringMap";
import ListIcon from "@material-ui/icons/List";
import SearchIcon from "@material-ui/icons/Search";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

let trackAccom = [];
let refreshMap = false;
let playButton = false;
let clearCLuster = false;
let markerCluster = [];
const MapComponents = React.memo(
  ({
    trackAccomParam,
    isOpen,
    onToggleOpen,
    refreshMap,
    mapOption,
    clearTimeout,
    fieldmanDeatilsOpen,
  }) => {
    return (
      <Map
        trackAccom={trackAccomParam}
        isOpen={isOpen}
        onToggleOpen={onToggleOpen}
        refresh={refreshMap}
        clearCLuster={clearCLuster}
        playButton={playButton}
        mapOption={mapOption}
        clearTimeout={clearTimeout}
        fieldmanDeatilsOpen={fieldmanDeatilsOpen}
      />
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.refreshMap === nextProps.refreshMap) {
      return true;
    } else {
      return false;
    }
  }
);
const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
  
  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }
  
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];
  
  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 480,
    },
  });
function AccountList() {
  const [mapOption, setmapOption] = React.useState({
    zoom: 12,
    lat: 13.7565,
    lng: 121.0583,
  });
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div style={{ marginTop: 50, padding: 10 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <div >
            <Typography>Accounts Master List</Typography>
          </div>
          <hr />
        </Grid>
        <Grid item xs={12} md={12}>
          <div className="nav-option">
            <div></div>
            <div
              style={{
                display: "flex",
                backgroundColor: "#fff",
                height: 25,
                alignItems: "center",
                width: 180,
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: 20,
                borderWidth:1,
                borderStyle:'solid',
                borderColor:'#b2bec3'
              }}
            >
              <input
                placeholder="Search"
                style={{ border: "none", outline: "none", width: 150 }}
              />
              <SearchIcon />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card className={classes.root} className='account-list-card' variant='outlined'>
              <CardContent>
              <TableContainer className={classes.container} >
              <Table stickyHeader size="small" aria-label="sticky table ">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth,backgroundColor:"#1b5ea0",color:'#fff'}}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody >
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell  key={column.id} align={column.align}>
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
            style={{color:'#fff'}}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
              </CardContent>
          
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default React.memo(AccountList);
