import React, { useEffect,useRef } from 'react';
import '../../../App';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// /*import { getUsers, getJD } from '../Functions/home_func'*/
import Charts from './charts'
import useStyles from '../../../css/css';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import RealtimeCharts from './initial';
import { NotificationContainer } from 'react-notifications';
import { useSelector, useDispatch } from 'react-redux'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
function Index() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        loader: false,
    });
    const messagesEndRef = useRef(null);
    const home_reducer = useSelector(state => state.home_reducer)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <div className={classes.root}>
            <NotificationContainer />
            <div ref={messagesEndRef} />
            <Backdrop className={classes.backdrop} open={state.loader}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Breadcrumbs aria-label="breadcrumb" gutterBottom>
                <Link>Home Page</Link>
            </Breadcrumbs>
             {/* <Charts scrollToBottom={scrollToBottom}/> */}
             <RealtimeCharts scrollToBottom={scrollToBottom}/>
        </div >
    );
}

export default Index;
