import {
  GridList,
  ListItem,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core'
import { Time, Temperature } from './SubComponents'
const useStyles = makeStyles({
  root: {
    margin: '50px auto'
  },
  gridList: {
    borderTop: 'solid 1px white',
    borderBottom: 'solid 1px white',
    marginTop: '0'
  },
  listItem: {}
})

export default function DayDetails ({ weather, timezone, unit }) {
  const classes = useStyles()
  const details = {
    sunrise: 'time',
    sunset: 'time',
    feels_like: 'temp',
    humidity: '%',
    pressure: 'hPa',
    wind_speed: 'm/s',
    visibility: 'm',
    uvi: '',
    dew_point: 'temp',
    clouds: '%'
  }
  return (
    <div className={classes.root}>
      <Typography variant='overline'>Day Details</Typography>
      <GridList className={classes.gridList}>
        {Object.entries(details).map(([prop, value]) => {
          const component =
            value === 'time' ? (
              <Time dt={weather[prop]} timezone={timezone} variant='h6' />
            ) : value === 'temp' ? (
              <Temperature
                temperature={weather[prop]}
                unit={unit}
                variant='h6'
              />
            ) : (
              <Typography variant='h6'>
                {weather[prop]} {value}
              </Typography>
            )

          return (
            <ListItem
              key={prop}
              className={classes.listItem}
              style={{ height: 'auto' }}
            >
              <ListSubheader
                inset
                component='div'
                style={{ textTransform: 'uppercase' }}
              >
                {prop.replaceAll('_', ' ')}
              </ListSubheader>
              <div>{component}</div>
            </ListItem>
          )
        })}
      </GridList>
    </div>
  )
}
