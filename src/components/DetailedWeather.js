import { useState, forwardRef } from 'react'
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
  const [unit, setUnit] = useState(localStorage.getItem('unit'))
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
        <Grid
          container
          spacing={10}
          style={{ height: '100%' }}
          justify='space-between'
        >
          <Grid item>
            <UnitInput unit={unit} updateUnit={value => setUnit(value)} />
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
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
