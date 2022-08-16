import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { useTheme, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../../App'
import useStyles from '../../../../../css/css'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import OpenInNewIcon from '@material-ui/icons/OpenInNew'

function FieldTable ({page,rowsPerPage,handleChangePage,handleChangeRowsPerPage,initialHeader,accomRecords,handleDialogOpen}) {
  const home_reducer = useSelector(state => state.home_reducer)
  const dispatch = useDispatch()
 
  const theme = useTheme()
  const classes = useStyles()
  const [renderHead, setrenderHead] = React.useState(false);


  useEffect(()=>{
    setrenderHead(!renderHead)
  },[initialHeader])
  return (
    <Paper variant="outlined">
      <TableContainer 
       className={classes.container}
       style={{ height: 470, maxWidth: '90vw' ,}}  size='small'>
        <Table size='small' stickyHeader style={{ whiteSpace: 'nowrap' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ position: 'sticky', zIndex: 5, left: 1, backgroundColor: 'rgba(6,86,147)',  color: 'white' }}>
                <TableCell style={{backgroundColor: 'rgba(6,86,147)', color: 'white', borderBottomColor: 'rgba(6,86,147)'}} >Action</TableCell>
                <TableCell style={{ backgroundColor: 'rgba(6,86,147)',  color: 'white', borderBottomColor: 'rgba(6,86,147)' }} > Status </TableCell>
              </TableCell>
              {initialHeader.map(column => {
                return (
                  <TableCell
                    key={column.category_field}
                    // align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: 'rgba(6,86,147)',
                      color: 'white'
                    }}>
                    {column.category_details}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
          {accomRecords
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(row => {
            let status = 'Accomplished'
            let bgcolor = '#58B19F'
            if (
              row.date_accomplished === '' ||
              row.date_accomlished === null
            ) {
              status = 'Pending'
              bgcolor = '#E74C3C'
            }
            return (
              <TableRow
                hover
                role='checkbox'
                tabIndex={-1}
                key={row.code}
              >
                <TableCell
                  style={{
                    position: 'sticky',
                    zIndex: 2,
                    left: 1,
                    backgroundColor: 'white'
                  }}
                >
                  <TableCell
                    style={{
                      backgroundColor: 'white',
                      borderBottomColor: 'white'
                    }}
                  >
                    <center
                      style={{
                        display: 'flex',
                        flexDirection: 'row'
                      }}
                    >
                      <Typography
                        style={{
                          cursor: 'pointer',
                          color: 'rgba(6,86,147)'
                        }}
                        onClick={() => {
                          handleDialogOpen('viewProfile',row)
                        }}>
                        <OpenInNewIcon />
                      </Typography>
                    </center>
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: 'white',
                      borderBottomColor: 'white'
                    }}
                  >
                    <center>
                      <Typography
                        style={{
                          color: 'white',
                          backgroundColor: bgcolor,
                          padding: 3,
                          borderRadius: 12
                        }}
                      >
                        {status}
                      </Typography>
                    </center>
                  </TableCell>
                </TableCell>

                {initialHeader.map(column => {
                  let bal = 0
                  let value = row[column.category_field]
                  if (column.category_field === 'date_accomplished') {
                    if (
                      row[column.category_field] === '' ||
                      row[column.category_field] === null
                    ) {
                      value = ''
                    } else {
                      value = moment(
                        row[column.category_field]
                      ).format('LL')
                    }
                  }
                  if (column.category_field === 'time_accomplished') {
                    if (
                      row[column.category_field] === '' ||
                      row[column.category_field] === null
                    ) {
                      value = ''
                    } else {
                      value = row[column.category_field]
                    }
                  }
                  if (column.category_field === 'all_images') {
                    value = row.all_images.length
                  }
                  if (
                    column.category_details === 'Outstanding Balance'
                  ) {
                    if (
                      row[column.category_field] === '' ||
                      row[column.category_field] === null
                    ) {
                      value = '₱ 0.00'
                    }
                  }
                  return (
                    <TableCell
                      key={column.category_field}
                      align={column.align}
                      style={{
                        whiteSpace: 'nowrap',
                        maxWidth: 150,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {column.category_details ===
                      'Outstanding Balance' ? (
                        <>₱&nbsp;</>
                      ) : (
                        undefined
                      )}
                      {column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={accomRecords.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
export default FieldTable
