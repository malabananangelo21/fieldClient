import React, { useEffect } from 'react';
import '../../../App';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
/*import { getUsers, getJD } from '../Functions/home_func'*/
import useStyles from '../../../css/css';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import InitialTable from './accomplishments_table/accomplishments_table'
import { NotificationContainer } from 'react-notifications';
import { useSelector, useDispatch } from 'react-redux'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
function Index() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        loader: false,
    });
    const home_reducer = useSelector(state => state.home_reducer)

    return (
        <div className={classes.root}>
            <NotificationContainer />
            <Backdrop className={classes.backdrop} open={state.loader}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Breadcrumbs aria-label="breadcrumb" gutterBottom>
                <Link>Home Page</Link>
                <Typography color="textPrimary">Accomplishments</Typography>
                {home_reducer.SelectedBranch.map((val, index) => {
                    return <Typography color="textPrimary">{val.branch_company}</Typography>
                })}
                {home_reducer.dateFrom != ''
                    ? < Typography color="textPrimary">{home_reducer.dateFrom + ' - ' + home_reducer.dateTo} </Typography> :
                    < Typography color="textPrimary"></Typography>
                }
            </Breadcrumbs>
            {/* <Initial_cards /> */}
            <Grid container spacing={0}>
                <Grid item xs={12} md={12}>
                    <InitialTable />
                </Grid>
            </Grid>
        </div >
    );
}

export default Index;
