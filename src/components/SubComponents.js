import { Typography } from '@material-ui/core'
import { getTime } from '../utils'

function WeatherIcon ({ weather, size }) {
  return (
    <img
      style={{ margin: 'auto' }}
      src={`http://openweathermap.org/img/w/${weather.icon}.png`}
      alt={weather.description}
      caption={weather.description}
      width={size}
      height={size}
    />
  )
}
function Description ({ weather, variant = 'subtitle' }) {
  return (
    <Typography
      component='div'
      align='center'
      variant={variant}
      style={{ textTransform: 'capitalize' }}
    >
      {weather.description}
    </Typography>
  )
}
function Time ({ dt, timezone }) {
  return <Typography variant='body1'>{getTime(timezone, dt)}</Typography>
}

function Temperature ({ temperature, variant = 'h3' }) {
  return (
    <Typography align='center' variant={variant}>
      {temperature}&deg;
    </Typography>
  )
}

export { WeatherIcon, Temperature, Description, Time }
