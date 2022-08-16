import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as NewLink } from 'react-router-dom'
import '../../../App'
import useStyles from '../../../css/css'
function Index() {
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
  const dispatch = useDispatch()
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data
    })
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={2}>
          <Card className={classes.boxingshadow}>
            <CardActionArea
              onClick={() => {
                dispatch_data('system_apps', true)
                dispatch_data('field_apps', false)
              }}
            >
              <CardContent
                style={{
                  minHeight: 200,
                  color: 'white',
                  backgroundColor: '#f78fb3'
                }}
              >
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
                    style={{ width: '50%', height: 'auto', margin: 'auto' }}
                  />
                  <Typography style={{ color: 'white', margin: 'auto' }}>
                    HOME
                  </Typography>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        {navigation_reducer.appNav.length !== 0 ? (
          navigation_reducer.appNav.map((val, index) => {
            let icons = 'blank.png'
            let feature = ['Details not available']
            let desc = 'Details not available'
            let display = 'hidden'
            let match = true
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
            if (val.parent_name === "Accomplishment") {
              let filter_map = navigation_reducer.appNav.filter((val2) => (val2.parent_name === "Map"))
              console.log(filter_map)
              if (filter_map.length > 0) {
                match = false
              } else {
                val.parent_name = "Map"
                val.href = "/newmap/clientMap"
              }
            }

            if (match)
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
                        <CardContent style={{ minHeight: 200, backgroundColor: val.bgColor }}>
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
                                width: '50%',
                                height: 'auto',
                                margin: 'auto'
                              }}
                            />
                            <Typography
                              style={{ color: val.txtColor, margin: 'auto' }}
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
    </div>
  )
}

export default Index
