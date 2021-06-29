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

import { OneCallAPI } from '../sample-data.json'
function getDetailedForecast (city) {
  return OneCallAPI
}

const Transition = forwardRef(function Transition (props, ref) {
  return <Zoom ref={ref} {...props} />
})
export default function DetailedWeather ({ open, forecast, onClose }) {
  const detailedForecast = getDetailedForecast(forecast.name)

  const classes = makeStyles({
    dialog: {
      backgroundImage: forecast.background,
      '&:after': {
        content: '""',
        background: 'url(...)',
        position: 'absolute',
        top: '0',
        left: '0',
        height: ' 100%',
        width: ' 100%',
        display: 'block',
        opacity: '0.5'
      }
    }
  })()
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='xl'
      TransitionComponent={Transition}
    >
      <DialogContent className={classes.dialog}>
        <DialogActions>
          <Button onClick={onClose} color='secondary'>
            Done
          </Button>
        </DialogActions>
        <Grid container spacing={2} style={{ height: '100%' }}>
          <Grid item xs={12} className={classes.grid}>
            <Paper>
              <CityDetail forecast={forecast} />
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
