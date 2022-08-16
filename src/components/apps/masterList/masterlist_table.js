import React from "react";
// import "../../../../../src/App.css";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Breadcrumbs,
  Link,
  TextField,
  Box,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent

} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
// import { getData } from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FilterListIcon from '@material-ui/icons/FilterList';
import FilterComponent from './filter'
import CloseIcon from '@material-ui/icons/Close';
import { getData } from "../../api/api";
const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 400,
    },
  });
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
function AccountMasterListTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const [state, setState] = React.useState({
    Selectedcompany:'',
    Selected_branch:'',
    open:false,
    countRequest:0
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const map_reducer = useSelector((state) => state.map_reducer);
  const home_reducer = useSelector((state) => state.home_reducer);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onChangeCompany = (e) => {
    const branches_data = home_reducer.handleBranch.filter(
      (val) => val.company_id == e.target.value
    );
    branches_data.sort(function (a, b) {
      return a["branch_name"].localeCompare(b["branch_name"]);
    });
    home_reducer.SelectedBranches = branches_data;
    setState((prev) => ({
      ...prev,
      Selectedcompany: e.target.value,
    }));
  };

  const onChangeBranch = (e) => {
    let jo_type = [];
    let branch_field_details = [];
    let job_position = "Messenger";
    home_reducer.SelectedBranches.map((val, index) => {
      console.log(val);
      if (val.branch_id === e.target.value) {
        if (val.branch_field_work !== "") {
          jo_type = JSON.parse(val.branch_field_work);
          if (val.branch_field_details != null) {
            branch_field_details = JSON.parse(val.branch_field_details);
          }
        }
      }
    });

    map_reducer.branch_field_details = branch_field_details;
    map_reducer.jo_type = jo_type;
    map_reducer.job_position = job_position;
    map_reducer.selected_jo = [];
    setState((prev) => ({
      ...prev,
      Selected_branch: e.target.value,
    }));
  };

  const onChangeJobOrder = (e) => {
    map_reducer.selected_jo.push(e.target.value);
    setState((prev) => ({
      ...prev,
    }));
  };
  const handleClose = (e) =>{
    setState(prev=>({...prev,open:false}))
  }

  async function getAccountsMasterList(param){
    try{
      let res = await getData('aam/getAccountsMasterList',param)
      setState((prev) => ({ ...prev, countRequest:0}));
      console.log(res)

    }catch(error){
      let res = String(error).includes("Network Error");
      errorhandling(res,param)
    }
  }
  const errorhandling =(res,param)=>{
    if (res) {
      if (state.countRequest < 3) {
        setTimeout(() => {
          getAccountsMasterList(param);
        }, 2000);
        setState((prev) => ({ ...prev, countRequest: state.countRequest++ }));
        } else {
          // dispatch_data("loading_map", false);
        alert("Please check your internet connection.");
      }
    } else {
      // dispatch_data("loading_map", false);
      alert("Something went wrong.");
    }
  }
  
  return (
    <div> 
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
            <Button
            size="medium"
            variant="contained"
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginRight:5
            }}
            className={classes.button}
            endIcon={<FilterListIcon />}
            onClick={()=>setState(prev=>({...prev,open:true}))}
          >
            Filter
          </Button>
            <Button
            size="medium"
            variant="contained"
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginRight:5
            }}
            className={classes.button}
            endIcon={<CloudDownloadIcon />}
          >
            Export
          </Button>
          <Button
            size="medium"
            variant="contained"
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginRight:5
            }}
            className={classes.button}
            endIcon={<AddCircleIcon />}
          >
            Add
          </Button>
            </div>
            <div>
            <TextField
          id="outlined-password-input"
        //   label="Search"
          variant="outlined"
          size='small'
          style={{marginRight:5}}
        />
       <Button
            size="medium"
            variant="contained"
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
            
            }}
            className={classes.button}
            endIcon={<SearchIcon />}
          >
            Search
          </Button>
            </div>
        
         
        </div>
       
      <Card variant={"outlined"} style={{marginTop:10}}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ backgroundColor: "rgba(6,86,147)",
                    color: "#fff",
                    width: "20%",}}
                    
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Card>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div style={{ position: "absolute", right: 1, top: 1 }}>
          <IconButton aria-label="delete">
            <CloseIcon
              onClick={(e) => handleClose()}
              style={{ color: "#000" }}
            />
          </IconButton>
        </div>
        <DialogTitle id="alert-dialog-slide-title">
          {"Generate Accomplishments"}
        </DialogTitle>
        <DialogContent>
          <FilterComponent
            onChangeCompany={onChangeCompany}
            Selectedcompany={state.Selectedcompany}
            onChangeBranch={onChangeBranch}
            Selected_branch={state.Selected_branch}
            onChangeJobOrder={onChangeJobOrder}
            getAccountsMasterList={getAccountsMasterList}
          />
        </DialogContent>
      </Dialog>
     
    </div>
  );
}

export default React.memo(AccountMasterListTable);
