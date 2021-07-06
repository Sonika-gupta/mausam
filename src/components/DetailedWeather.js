import { forwardRef } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Zoom
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Current from './Current'
import Hourly from './Hourly'
import Daily from './Daily'
import UnitInput from './UnitInput '
import DayDetails from './DayDetails'

const Transition = forwardRef(function Transition (props, ref) {
  return <Zoom ref={ref} {...props} />
})
export default function DetailedWeather ({
  open,
  onClose,
  onAdd,
  forecast,
  showAdd,
  unit,
  updateUnit
}) {
  const classes = makeStyles({
    dialog: {
      minwidth: '400px',
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
        <Grid
          container
          spacing={10}
          style={{ height: '100%' }}
          justify='space-between'
        >
          <Grid item>
            <UnitInput unit={unit} updateUnit={updateUnit} />
          </Grid>
          <Grid item>
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
          </Grid>
          <Current forecast={forecast} unit={unit} />
          <Hourly
            forecast={forecast.hourly}
            unit={unit}
            timezone={forecast.timezone}
          />
          <Daily
            forecast={forecast.daily}
            unit={unit}
            timezone={forecast.timezone}
          />
          <DayDetails
            weather={forecast.current}
            timezone={forecast.timezone}
            unit={unit}
          />
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
