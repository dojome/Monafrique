import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import { useSelector } from 'react-redux'

const price_formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const columns = [
  { id: 'order', label: 'Order', align: 'left', minWidth: 150 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'total',
    label: 'Total',
    minWidth: 120,
    align: 'left',
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 740,
  },
  regular_price: {
    textDecoration: 'line-through',
  },
  sales_price: {
    textDecoration: 'underline',
  },
  action_cell: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export default function ViewOrders() {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const orders = useSelector((state) => state.orders.orders)
  const [rows, setRows] = React.useState([])

  useEffect(() => {
    const data = orders.map((order) => ({
      order: `#${order.id} ${order.billing.first_name} ${order.billing.last_name}`,
      date: order.date_modified,
      status: order.status,
      total: price_formatter.format(order.total),
    }))
    setRows(data)
  }, [orders])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell align="left">
                        <Typography
                          variant="overline"
                          gutterBottom
                          onClick={() => window.open(row.link)}
                        >
                          {row.order}
                        </Typography>
                      </TableCell>

                      <TableCell align="left">
                        <Typography variant="overline" gutterBottom>
                          {row.date.split('T')[0]}
                        </Typography>
                      </TableCell>

                      <TableCell align="left">
                        <Typography variant="overline" gutterBottom>
                          {row.status}
                        </Typography>
                      </TableCell>

                      <TableCell align="left">
                        <Typography variant="overline" gutterBottom>
                          {row.total}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
