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
  { id: 'image', label: '', align: 'left', minWidth: 50 },
  { id: 'name', label: 'Name', align: 'left', minWidth: 250 },
  {
    id: 'sku',
    label: 'SKU',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 'stock',
    label: 'Stock',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 'categories',
    label: 'Categories',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'tags',
    label: 'Tags',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'date',
    label: 'Dates',
    minWidth: 170,
    align: 'left',
  },
  // {
  //   id: 'actions',
  //   label: 'Actions',
  //   minWidth: 250,
  //   align: 'center',
  // },
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
  name: {
    fontWeight: 'bold',
  },
  cursor_point: {
    cursor: 'pointer',
  },
}))

export default function ViewAllProducts() {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [rows, setRows] = React.useState([])
  const products = useSelector((state) => state.products.products)
  console.log(products)
  useEffect(() => {
    const data = products.map((product) => ({
      image: product.images[0] && product.images[0].src,
      name: product.name && product.name,
      sku: product.sku && product.sku,
      stock:
        product.stock_status === 'instock'
          ? 'In stock'
          : product.stock_status === 'onbackorder'
          ? 'On backorder'
          : product.purchasable === 'inpurchaseable'
          ? 'In purchaseable'
          : 'Out of stock',
      price: [
        price_formatter.format(product.regular_price && product.regular_price),
        price_formatter.format(product.sale_price && product.sale_price),
      ],
      categories:
        product.categories &&
        product.categories.map((category) => category.name),
      tags: product.tags && product.tags.map((tag) => tag.name),
      dates: product.date_modified && product.date_modified,
      link: product.permalink,
    }))
    setRows(data)
  }, [products])

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
                        <img width="50" src={row.image} alt={row.name}></img>
                      </TableCell>
                      <TableCell
                        className={classes.cursor_point}
                        align="left"
                        onClick={() => window.open(row.link)}
                      >
                        <Typography
                          variant="button"
                          className={classes.name}
                          gutterBottom
                        >
                          {row.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="overline" gutterBottom>
                          {row.sku}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="overline" gutterBottom>
                          {row.stock}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <p className={classes.regular_price}>{row.price[0]}</p>
                        <p className={classes.sales_price}>{row.price[1]}</p>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="overline" gutterBottom>
                          {row.categories.toString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="overline" gutterBottom>
                          {row.tags.toString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <p>{row.dates.split('T')[0]}</p>
                      </TableCell>
                      {/* <TableCell align="center" className={classes.action_cell}>
                        <Button variant="contained" color="primary">
                          Edit
                        </Button>
                        <Button variant="contained" color="secondary">
                          Delete
                        </Button>
                      </TableCell> */}
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
