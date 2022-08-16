import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WorkFlow from '../../../../src/assets/map image/WorkFlow.jpg'
import '../../../App'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import useStyles from '../../../css/css'
import SysApp from './system_apps'
function Index () {
  const classes = useStyles()
  const home_reducer = useSelector(state => state.home_reducer)
  const [state, setState] = React.useState({
    search: '',
    apps: true
  })
  const dispatch = useDispatch()
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data
    })
  }
  return (
    <div className={classes.root}>
      {/* {home_reducer.system_apps === false ? (
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={2}>
            <Card className={classes.boxingshadow}>
              <CardActionArea
                onClick={() => {
                  dispatch_data('system_apps', true)
                }}
              >
                <CardContent style={{ height: 200 }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignContent: 'center'
                    }}
                  >
                    <img
                      src={WorkFlow}
                      style={{ width: '50%', height: 'auto', margin: 'auto' }}
                    />
                    <Typography
                      style={{ color: 'rgba(6,86,147)', margin: 'auto' }}
                    >
                      WorkFlow
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <SysApp />
      )} */}
        <SysApp />

    </div>
  )
}

export default Index
