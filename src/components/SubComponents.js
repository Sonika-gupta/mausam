import { Typography } from '@material-ui/core'
import { getTime, getDay, getTemp } from '../utils'

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
function Description ({ weather, variant = 'subtitle1' }) {
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

function Time ({ dt, timezone, variant = 'body1' }) {
  return <Typography variant={variant}>{getTime(timezone, dt)}</Typography>
}

function Day ({ dt, timezone }) {
  return <Typography variant='caption'>{getDay(timezone, dt)}</Typography>
}

function Temperature ({ temperature, unit, variant = 'h3' }) {
  // console.log('temperature', temperature)
  const temp = unit ? getTemp(temperature)[unit] : temperature
  return (
    <Typography align='center' variant={variant}>
      {temp}&deg;
    </Typography>
  )
}

export { WeatherIcon, Temperature, Description, Time, Day }
