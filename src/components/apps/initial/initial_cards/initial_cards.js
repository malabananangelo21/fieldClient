import React, { useEffect } from 'react';
import '../../../../App';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
/*import { getUsers, getJD } from '../Functions/home_func'*/
import useStyles from '../../../../css/css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
function Index() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>card</Typography>
                            <Typography className={classes.pos}>5</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>card</Typography>
                            <Typography className={classes.pos}>5</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>card</Typography>
                            <Typography className={classes.pos}>5</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>card</Typography>
                            <Typography className={classes.pos}>5</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Index;
