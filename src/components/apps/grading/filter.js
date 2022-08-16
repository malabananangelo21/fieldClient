import DateFnsUtils from "@date-io/date-fns";
import {
  Button, Card,
  CardContent, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, Grid, Input, InputLabel, List, MenuItem, Select
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetEvalMonth } from "../Functions/home_func";

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
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function Filter({
  handleDateChangeStart,
  date_start_val,
  Selectedcompany,
  Selected_branch,
  onChangeJobOrder,
  getMapData,
  onResponse,
}) {
  const theme = useTheme();
  const [state, setState] = React.useState({
    modal_employee: false,
    check_all: false,
    Selectedcompany: "",
    Selected_branch: "",
    selected_jo: [],
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    year: [],
  });
  const dispatch = useDispatch();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };  
  const filter_reducer = useSelector((state) => state.filterReducer);
  const map_reducer = useSelector((state) => state.map_reducer);
  const home_reducer = useSelector((state) => state.home_reducer);
  const handleListItemClick = (event, index, val) => {
    let jo_type = [];
    let match = false;
    filter_reducer.selected_jo.map((va_data, index) => {
      if (va_data != val) {
        jo_type.push(va_data);
      } else {
        match = true;
      }
    });
    if (!match) {
      jo_type.push(val);
    }

    dispatch({ type: "onChangeFilterData", data: { selected_jo: jo_type } });
  };
  const onSubmit = (e) => {
    dispatch_data("loader", true);
    e.preventDefault();
    let data = {
      parameter: "branch_id",
      selection: [Selected_branch],
      from: moment(date_start_val).format("YYYY-MM-DD"),
      to: moment(date_start_val).format("YYYY-MM-DD"),
      date: moment(selectedDate).format("YYYY-MM-DD"),
      company_id: filter_reducer.selected_company_id,
      branch_id: [filter_reducer.selected_branch_id],
      jo_type: filter_reducer.selected_jo[0],
    };
    GetEvalMonth(data).then((response) => {
      onResponse(response,data)
      dispatch_data("loader", false);
    });
  };
  const onChangeCompany = (e) => {
    const branches_data = home_reducer.handleBranch.filter(
      (val) => val.company_id == e.target.value
    );
    branches_data.sort(function (a, b) {
      return a["branch_name"].localeCompare(b["branch_name"]);
    });
    dispatch({
      type: "onChangeFilterData",
      data: {
        selected_branches: branches_data,
        selected_company_id: e.target.value,
      },
    });
  };
  const onChangeBranch = (e) => {
    let jo_type = [];

    filter_reducer.selected_branches.map((val, index) => {
      if (val.branch_id === e.target.value) {
        if (val.branch_field_work !== "") {
          jo_type = JSON.parse(val.branch_field_work);
        }
      }
    });
    dispatch({
      type: "onChangeFilterData",
      data: { selected_branch_id: e.target.value, jo_type: jo_type },
    });
  };
  const add_years = (dt, n) => {
    return new Date(dt.setFullYear(dt.getFullYear() - n));
  };
  React.useEffect(() => {
    let year = [];
    for (let index = 1; index >= 0; index--) {
      year.push(moment(add_years(new Date(), index)).format("YYYY"));
    }
    setState((prev) => ({ ...prev, year: year }));
  }, []);
  const onChangeMonth = (e) => {
    dispatch({
      type: "onChangeFilterData",
      data: { selectedMonth: e.target.value },
    });
  };
  const onChangeYear = (e) => {
    dispatch({
      type: "onChangeFilterData",
      data: { selectedYear: e.target.value },
    });
  };
  const [selectedDate, setSelecteddate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelecteddate(date);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} md={8}>
          <FormControl size="small" style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Month
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={onChangeMonth}
                label="Company"
                name="company"
                value={Selectedcompany}
              >
                {state.monthNames.map((val) => {
                  return (
                    <MenuItem value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
          <FormControl size="small" style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Year
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={onChangeYear}
                label="Company"
                name="company"
                value={Selectedcompany}
              >
                {state.year.map((val) => {
                  return (
                    <MenuItem value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12} md={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="date-picker-dialog"
                label="Year and Month"
                helperText="Start from year selection"
                style={{ width: "100%" }}
                views={["year", "month"]}
                openTo="year"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl size="small" style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Company
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={onChangeCompany}
                label="Company"
                name="company"
                // value={Selectedcompany}
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
              //   className={classes.formControl}
              style={{ width: "100%" }}
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
                value={Selected_branch}
              >
                {filter_reducer.selected_branches.map((val, index) => {
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
              style={{ width: "100%" }}
              onClick={() =>
                setState((prev) => ({ ...prev, modal_employee: true }))
              }
            >
              <InputLabel shrink htmlFor="select-multiple-native">
                Job Order
              </InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                value={filter_reducer.selected_jo}
                // onChange={handleChange}

                input={<Input />}
                MenuProps={MenuProps}
                readOnly
                required
              >
                {filter_reducer.jo_type.map((val, index) => (
                  <MenuItem
                    key={index}
                    value={val}
                    style={getStyles(val, filter_reducer.selected_jo, theme)}
                  >
                    {val}
                  </MenuItem>
                ))}
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
      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.modal_employee}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">
          Select Job Order Type
        </DialogTitle>
        <DialogContent>
          <form>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <List component="nav" aria-label="main mailbox folders">
                      {filter_reducer.jo_type.map((val, index) => {
                        let value = filter_reducer.selected_jo.filter(
                          (data) => data == val
                        );
                        let check = false;
                        if (value.length != 0) {
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
                              label={val}
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
            onClick={() =>
              setState((prev) => ({ ...prev, modal_employee: false }))
            }
            color="primary"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
