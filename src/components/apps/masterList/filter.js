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
  onChangeCompany,
  Selectedcompany,
  onChangeBranch,
  Selected_branch,
  onChangeJobOrder,
  getAccountsMasterList
}) {
  const theme = useTheme();

  const [state, setState] = React.useState({
    modal_employee: false,
    check_all: false,
  });
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
      map_reducer.selected_jo.map((va_data) => {
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
      selection: Selected_branch,
      company_id: Selectedcompany,
      jo_type:map_reducer.selected_jo
    };
    getAccountsMasterList(data)
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
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
                value={Selectedcompany}
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
      
    </>
  );
}
