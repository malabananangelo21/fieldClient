import { makeStyles, useTheme, fade } from '@material-ui/core/styles'
import {
  green,
  pink,
  red,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey
} from '@material-ui/core/colors'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& > .fa': {
      margin: theme.spacing(2)
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  card_design: {
    backgroundColor: '#2f3640',
    textAlign: 'justify',
    padding: theme.spacing(1)
  },
  card_design2: {
    textAlign: 'justify',
    padding: theme.spacing(1)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'justify',
    fontSize: 12
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  // purple: {
  //     color: theme.palette.getContrastText(deepPurple[500]),
  //     backgroundColor: deepPurple[500],
  //   },
  title: {
    textAlign: 'left'
  },
  center: {
    textAlign: 'center'
  },
  pullRight: {
    textAlign: 'right'
  },
  pullLeft: {
    textAlign: 'left'
  },
  greencolor: {
    color: 'green'
  },
  greenbackground: {
    backgroundColor: green[800]
  },
  mb5: {
    marginBottom: '5px'
  },
  mb10: {
    marginBottom: '10px'
  },
  mb15: {
    marginBottom: '15px'
  },
  mb20: {
    marginBottom: '20px'
  },
  mb30: {
    marginBottom: '30px'
  },
  bgcolorgreen: {
    backgroundColor: green[500],
    color: 'white'
  },
  noright: {
    right: 0
  },
  norightbuttongreen: {
    backgroundColor: green[500],
    left: 0,
    color: 'white'
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    width: '100%'
  },
  dflex: {
    display: 'flex',
    // flexWrap: 'wrap',
    justifyItems: 'space-between',
    flexDirection: 'row'
  },
  formControl: {
    margin: theme.spacing(0),
    width: '100%'
  },
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  tabtab: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  colorgreen600: {
    color: green[600]
  },
  bggradientblue: {
    backgroundColor: 'linear-gradient(to bottom,#61a8e8 0,#2083dd 100%)'
  },
  button: {
    margin: theme.spacing(0)
  },
  table: {
    width: '100%'
  },
  presentCard: {
    backgroundColor: '#3f51b5'
  },
  lateCard: {
    backgroundColor: amber[800]
  },
  absentCard: {
    backgroundColor: deepOrange[500]
  },
  mainColor: {
    color: 'rgba(0,47,84)'
  },
  mainBgColor: {
    backgroundColor: 'rgba(0,47,84)'
  },
  subBgColor: {
    backgroundColor: 'rgba(6,86,147)'
  },
  subColor: {
    color: 'rgba(6,86,147)'
  },
  GraphCard: {
    backgroundColor: grey[50],
    width: '100%',
    height: 210
  },
  appBar: {
    position: 'relative'
  },
  DialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  },
  tabledetails: {
    background: 'transparent'
  },
  tableparent: {
    tablebutton: {
      display: 'none',
      color: 'transparent',
      '&:hover': {
        background: 'blue',
        color: 'white'
      }
    }
  },

  parent: {
    backgroundColor: 'inherit'
  },

  childs: {
    visibility: 'hidden'
  },
  parent: {
    childs: {
      '&:hover': {
        display: 'flex'
      }
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  boxingshadow: {
    borderRadius: '14px',
    // backgroundColor: '#fffff',
    boxShadow: '7px 7px 14px #d1d1d1, -7px -7px 14px #ffffff',
    minHeight: 180,
  }
}))

export default useStyles
