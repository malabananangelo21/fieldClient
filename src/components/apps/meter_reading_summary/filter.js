import React, { PureComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MenuItem,
  Button,
  Grid,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  List,
  Divider,
  FormControlLabel,
  Checkbox,
  DialogActions,
} from "@material-ui/core";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
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
  getMapData
}) {
  const theme = useTheme();
  const [state, setState] = React.useState({
    modal_employee: false,
    check_all: false,
    Selectedcompany:'',
    Selected_branch:'',
    selected_jo:[]

  });
  const dispatch = useDispatch();
  const filter_reducer = useSelector((state) => state.filter_reducer);
  const map_reducer = useSelector((state) => state.map_reducer);
  const home_reducer = useSelector((state) => state.home_reducer);
  const handleListItemClick = (event, index, val) => {
    let jo_type = [];
    let match = false;
    if (val == "ALL") {
      if (state.check_all == false) {
        map_reducer.accom_jo_type.map((va_data) => {
          jo_type.push(va_data);
        });
      } else {
        jo_type = [];
      }
      setState((prev) => ({ ...prev, check_all: !state.check_all }));
    } else {
      map_reducer.selected_jo.map((va_data,index) => {
        if (va_data != val) {
          jo_type.push(va_data);
        } else {
          match = true;
        }
      });
      if (!match) {
        jo_type.push(val);
      }
    }
    map_reducer.selected_jo = jo_type;
    setState((prev) => ({ ...prev }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
       let data = {
      parameter: "branch_id",
      selection: [Selected_branch],
      from: moment(date_start_val).format("YYYY-MM-DD"),
      to: moment(date_start_val).format("YYYY-MM-DD"),
      company_id: Selectedcompany,
      jo_type:map_reducer.selected_jo
    };
   
  };
  const onChangeCompany = (e) => {
    const branches_data = home_reducer.handleBranch.filter(
      (val) => val.company_id == e.target.value
    );
    branches_data.sort(function (a, b) {
      return a["branch_name"].localeCompare(b["branch_name"]);
    });
    dispatch({type:'onChangeFilterData',data:{selected_branches:branches_data,
        selected_company_id:e.target.value}})
  };
  const onChangeBranch = (e) => {
    let jo_type = [];
  
    // home_reducer.SelectedBranches.map((val, index) => {
    //   if (val.branch_id === e.target.value) {
    //     if (val.branch_field_work !== "") {
    //       jo_type = JSON.parse(val.branch_field_work);
    //       if (val.branch_field_details != null) {
    //         branch_field_details = JSON.parse(val.branch_field_details);
    //       }
    //       if (val.branches_pin_img != null) {
    //         pin_img = JSON.parse(val.branches_pin_img);
    //       }
    //       if (val.branch_field_personnel !== "") {
    //         let user_pos = JSON.parse(val.branch_field_personnel);
    //         job_position = user_pos[0];
    //       }
    //     }

    //   }
    // });
   
    setState((prev) => ({
      ...prev,
      Selected_branch: e.target.value,
    }));
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
              <KeyboardDatePicker
                id="date-picker-dialog"
                label="Filter Date"
                format="MM-dd-yyyy"
                name="date_start"
                value={date_start_val}
                style={{ width: "100%" }}
                onChange={handleDateChangeStart}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
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
                value={map_reducer.selected_jo}
                // onChange={handleChange}

                input={<Input />}
                MenuProps={MenuProps}
                readOnly
                required
              >
                {map_reducer.jo_type.map((val, index) => (
                  <MenuItem
                    key={index}
                    value={val}
                    style={getStyles(val, map_reducer.selected_jo, theme)}
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
                      {map_reducer.jo_type.map((val, index) => {
                        let value = map_reducer.selected_jo.filter(
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
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
