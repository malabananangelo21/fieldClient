import React, { PureComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Grid,
    IconButton,
    Typography,
    Backdrop,
    CardContent,
    Card,
    FormControl,
    InputLabel,
    Select
} from "@material-ui/core";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { getData } from "../../../api/api";
import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import Map from "../monitoringMap";
import '../css/home.css'
import './css/addjo.css'
import Filter from '../../grading/filter'
import Autocomplete from './autocomplete'
export default function AddJoRoute() {
    const map_reducer = useSelector((state) => state.map_reducer);
   
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <FormControl size="small" variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Company
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        // onChange={onChangeCompany}
                                        label="Company"
                                        name="company"
                                    // value={Selectedcompany}
                                    >
                                        {/* {home_reducer.company_name.map((val) => {
                                        return (
                                            <MenuItem value={val.company_id}>
                                                {val.company_name}
                                            </MenuItem>
                                        );
                                    })} */}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl
                                    variant="outlined"
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
                                        // onChange={onChangeBranch}
                                        label="branch"
                                        name="branch_id"
                                    // value={Selected_branch}
                                    >
                                        {/* {filter_reducer.selected_branches.map((val, index) => {
                                        return (
                                            <MenuItem value={val.branch_id}>
                                                {val.branch_company}
                                            </MenuItem>
                                        );
                                    })} */}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                             <Autocomplete/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    );
}
