import React, { useEffect } from 'react';
import '../../../App';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
/*import { getUsers, getJD } from '../Functions/home_func'*/
import useStyles from '../../../css/css';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import FieldTable from './field_table/field_table'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useSelector, useDispatch } from 'react-redux'

function Index() {
    const classes = useStyles();
    const home_reducer = useSelector(state => state.home_reducer)

    return (
        <div className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary">Accomplishments</Typography>
                {home_reducer.SelectedBranch.map((val, index) => {
                    return <Typography color="textPrimary">{val.branch_company}</Typography>
                })}
                {home_reducer.dateFrom != ''
                    ? < Typography color="textPrimary">{home_reducer.dateFrom + ' - ' + home_reducer.dateTo} </Typography> :
                    < Typography color="textPrimary"></Typography>
                }

            </Breadcrumbs>
            <Grid container spacing={0}>
                <Grid item xs={12} md={12}>
                    <FieldTable />
                </Grid>
            </Grid>

        </div >
    );
}

export default Index;
