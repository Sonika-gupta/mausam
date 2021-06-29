import Typography from '@material-ui/core/Typography'

function Description ({ weather }) {
  return (
    <img
      style={{ marginTop: '25%' }}
      src={`http://openweathermap.org/img/w/${weather.icon}.png`}
      alt={weather.description}
    ></img>
  )
}

function CityDetail ({ forecast }) {
  console.log(forecast)
  return (
    <>
      <Typography variant='overline'>{forecast.time}</Typography>
      <Typography variant='h6'>{forecast.name}</Typography>
    </>
  )
}

function Temperature ({ temperature }) {
  return (
    <Typography variant='h3'>
      {temperature}
      &deg;
    </Typography>
  )
}

export { Description, CityDetail, Temperature }