import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid } from '@material-ui/core'

import UploadProduct from './UploadProduct'
// import PreviewProduct from './PreviewProduct'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

function UploadProducts() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <UploadProduct />
          </Paper>
        </Grid>
        {/* <Grid item xs={6}>
          <Paper className={classes.paper}>
            <PreviewProduct />
          </Paper>
        </Grid> */}
      </Grid>
    </div>
  )
}

export default UploadProducts
