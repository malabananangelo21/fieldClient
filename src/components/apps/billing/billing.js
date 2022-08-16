import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useSelector } from 'react-redux';
import '../../../App';
/*import { getUsers, getJD } from '../Functions/home_func'*/
import useStyles from '../../../css/css';
import BillingTable from './billing_table/billing_table';

function Index() {
    const classes = useStyles();
    const home_reducer = useSelector(state => state.home_reducer)

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12} md={12}>
                    <BillingTable />
                </Grid>
            </Grid>
        </div >
    );
}

export default Index;
