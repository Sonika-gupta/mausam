import { forwardRef } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  Zoom
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Description, CityDetail, Temperature } from './SubComponents'

const Transition = forwardRef(function Transition (props, ref) {
  return <Zoom ref={ref} {...props} />
})
export default function DetailedWeather ({
  open,
  onClose,
  onAdd,
  forecast,
  showAdd
}) {
  const classes = makeStyles({
    dialog: {
      backgroundImage: forecast.background
    },
    dialogPaper: {
      minHeight: '90vh',
      maxHeight: '80vh'
    }
  })()
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='lg'
      TransitionComponent={Transition}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogContent className={classes.dialog}>
        <DialogActions>
          {showAdd && (
            <Button onClick={onAdd} color='secondary'>
              Add
            </Button>
          )}
          <Button onClick={onClose} color='secondary'>
            Done
          </Button>
        </DialogActions>
        <Grid container spacing={2} style={{ height: '100%' }}>
          <Grid item xs={12} className={classes.grid}>
            {forecast && (
              <Paper
                variant='outlined'
                style={{ background: 'transparent', border: 'none' }}
              >
                <CityDetail forecast={forecast} />
                <Temperature temperature={forecast.main.temp} />
                <Description weather={forecast.weather[0]} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
