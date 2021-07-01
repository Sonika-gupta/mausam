import { WeatherIcon, Temperature, Description } from './SubComponents'
import { getTemp } from '../utils'
import { Paper } from '@material-ui/core'

const styles = {
  background: 'transparent',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  padding: '10px 0'
}

export default function Tile ({ weather, unit, type, children }) {
  type === 'daily'
    ? Object.assign(weather, getTemp(weather.temp.day))
    : Object.assign(weather, getTemp(weather.temp))
  return (
    <Paper variant='outlined' square style={styles}>
      <WeatherIcon weather={weather.weather[0]} />
      <Temperature temperature={weather[unit]} variant='h5' />
      <Description weather={weather.weather[0]} variant='caption' />
      {children}
    </Paper>
  )
}
