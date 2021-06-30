import { WeatherIcon, Temperature, Description } from './SubComponents'
import { getTemp } from '../utils'
import { Paper } from '@material-ui/core'

const styles = {
  '&::-webkit-scrollbar': {
    width: '0.4em'
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    outline: '1px solid slategrey'
  },
  background: 'transparent',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  padding: '10px 0'
}

export default function Tile ({ weather, unit, children }) {
  Object.assign(weather, getTemp(weather))
  console.log(weather, unit)
  return (
    <Paper variant='outlined' square style={styles}>
      <WeatherIcon weather={weather.weather[0]} />
      <Temperature temperature={weather[unit]} variant='h5' />
      <Description weather={weather.weather[0]} variant='caption' />
      {children}
    </Paper>
  )
}
