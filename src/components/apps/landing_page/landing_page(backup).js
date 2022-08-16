import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link as NewLink } from 'react-router-dom'
import '../../../App'
import useStyles from '../../../css/css'
import WorkFlow from '../../../../src/assets/map image/WorkFlow.jpg'
import HR from '../../../../src/assets/map image/hr.png'
import Glogo from '../../../../src/assets/map image/glogos.png'
import Gzonetech from '../../../../src/assets/map image/gzonetech.png'
function Index () {
  const classes = useStyles()
  const navigation_reducer = useSelector(state => state.navigation_reducer)
  const [state, setState] = React.useState({
    search: ''
  })
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = index => {
    setState({
      ...state,
      display: index
    })
    setExpanded(!expanded)
  }
  const logout = () => {
    localStorage.clear()
    window.location.replace('https://client.fieldplus.gzonetechph.com/#/')
    // window.location.replace("http://localhost:3000/#/")
    window.location.reload()
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={2}>
          <Card
            className={classes.boxingshadow}
            // style={{ backgroundColor:'#e0e0e0', minHeight: 180, position: 'relative',boxShadow:'20px 20px 60px #dedede,-20px -20px 60px #ffffff' }}
          >
            <CardContent style={{ minHeight: 100 }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center'
                }}
              >
                <img
                  src={
                    'https://images.workflow.gzonetechph.com/icons/house.png'
                  }
                  style={{ width: '30%', height: 'auto', margin: 'auto' }}
                />
                <Typography style={{ color: 'rgba(6,86,147)', margin: 'auto' }}>
                  HOME
                </Typography>
                <div style={{ display: 'flex' }}>
                  {['Logout'].map((text, index) => (
                    <Button
                      size='small'
                      variant='outlined'
                      key={text}
                      onClick={() => {
                        logout()
                      }}
                      style={{
                        color: 'white',
                        backgroundColor: 'rgba(6,86,147)',
                        width: '100%',
                        marginBottom: 10
                      }}
                      startIcon={<ExitToAppIcon />}
                    >
                      {text}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        {navigation_reducer.appNav.length !== 0 ? (
          navigation_reducer.appNav.map((val, index) => {
            let icons = 'blank.png'
            let feature = ['Details not available']
            let desc = 'Details not available'
            let display = 'hidden'
            if (state.display === index) {
              display = 'visible'
            }
            if (val.nav_feat !== null) {
              feature = JSON.parse(val.nav_feat)
            }
            if (val.nav_desc !== null) {
              desc = val.nav_desc
            }
            if (val.navi_cons !== null) {
              icons = val.navi_cons
            }
            return (
              <Grid item xs={12} sm={12} md={2}>
                <Zoom in={true}>
                  <Card
                    className={classes.boxingshadow}
                    // className={classes.root}
                    // style={{ minHeight: 180, position: 'relative',boxShadow:'9px 9px 18px #bebebe', borderRadius: 12,backgroundColor:'#FAFAFA' }}
                  >
                    <CardActionArea
                      component={NewLink}
                      to={val.href}
                      target='_blank'
                    >
                      <CardContent style={{ minHeight: 100 }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center'
                          }}
                        >
                          <img
                            src={
                              'https://images.workflow.gzonetechph.com/icons/' +
                              icons
                            }
                            style={{
                              width: '40%',
                              height: 'auto',
                              margin: 'auto'
                            }}
                          />
                          <Typography
                            style={{ color: 'rgba(6,86,147)', margin: 'auto' }}
                          >
                            {val.parent_name.toUpperCase()}
                          </Typography>
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Zoom>
              </Grid>
            )
          })
        ) : (
          <Grid item xs={12} md={3}>
            <Card
              className={classes.root}
              style={{ minHeight: 180, position: 'relative' }}
            >
              <CardContent>
                <center>
                  <Typography style={{ color: 'rgba(6,86,147)' }}>
                    Pages not Found (Error: 403)
                  </Typography>

                  <Typography variant='body2' component='p'>
                    You do not have the necessary permissions to view any pages.
                  </Typography>
                </center>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <Divider variant='middle' style={{ marginBottom: 20, marginTop: 20 }} />
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={2}>
          <Card className={classes.boxingshadow}>
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
                <Typography style={{ color: 'rgba(6,86,147)', margin: 'auto' }}>
                  WorkFlow
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Card className={classes.boxingshadow}>
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
                  src={HR}
                  style={{ width: '50%', height: 'auto', margin: 'auto' }}
                />
                <Typography style={{ color: 'rgba(6,86,147)', margin: 'auto' }}>
                  PocketHR
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Card className={classes.boxingshadow}>
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
                  src={Glogo}
                  style={{ width: '50%', height: 'auto', margin: 'auto' }}
                />
                <Typography style={{ color: 'rgba(6,86,147)', margin: 'auto' }}>
                  Gmovers PH
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* <Divider variant='middle' style={{ marginBottom: 20, marginTop: 20 }} /> */}
      {/* <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={2}>
          <Card className={classes.boxingshadow}>
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
                <Typography style={{ color: 'rgba(6,86,147)', margin: 'auto' }}>
                  NGC Express Logistics, Inc.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Card className={classes.boxingshadow}>
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
                  src={HR}
                  style={{ width: '50%', height: 'auto', margin: 'auto' }}
                />
                <Typography style={{ color: 'rgba(6,86,147)', margin: 'auto' }}>
                  Fieldtech Specialist, Inc.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Card className={classes.boxingshadow}>
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
                  src={HR}
                  style={{ width: '50%', height: 'auto', margin: 'auto' }}
                />
                <Typography style={{ color: 'rgba(6,86,147)', margin: 'auto' }}>
                  NGC Enterprises
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Card className={classes.boxingshadow}>
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
                  src={HR}
                  style={{ width: '50%', height: 'auto', margin: 'auto' }}
                />
                <Typography style={{ color: 'rgba(6,86,147)', margin: 'auto' }}>
                  Pacificweb Internet Services, Inc.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Card className={classes.boxingshadow}>
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
                  src={Gzonetech}
                  style={{ width: '50%', height: 'auto', margin: 'auto' }}
                />
                <Typography style={{ color: 'rgba(6,86,147)', margin: 'auto' }}>
                  GZONETECH, Inc
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Card className={classes.boxingshadow}>
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
                  src={HR}
                  style={{ width: '50%', height: 'auto', margin: 'auto' }}
                />
                <Typography style={{ color: 'rgba(6,86,147)', margin: 'auto' }}>
                  Always Water
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Card className={classes.boxingshadow}>
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
                  src={HR}
                  style={{ width: '50%', height: 'auto', margin: 'auto' }}
                />
                <Typography style={{ color: 'rgba(6,86,147)', margin: 'auto' }}>
                  Fieldplus Solutions Services, Inc.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
    </div>
  )
}

export default Index
