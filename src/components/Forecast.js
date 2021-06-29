import { useState, useEffect } from 'react'
import { Container, Card, CardActionArea, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Description, CityDetail, Temperature } from './SubComponents'
import DetailedWeather from './DetailedWeather'
import { calculateDetails } from '../utils'

// import getForecast from '../getForecast'
import { WeatherForecastAPI as data } from '../sample-data.json'
const getForecast = loc => {
  console.log('fetching forecasts')
  return data[loc.name.toLowerCase()] || data['london']
}

const useStyles = makeStyles({
  card: {
    margin:
      '5px auto' /* ,
    backgroundPosition: 'center',
    backgroundSize: 'cover' */
  },
  city: {
    width: '70%',
    textAlign: 'left'
  },
  temperature: {
    margin: '5px'
  }
})

export default function Forecast ({ cities, unit }) {
  console.log('cities:', cities, 'unit', unit)
  const [forecasts, setForecasts] = useState([])
  const [open, setOpen] = useState(false)
  const [openedForecast, setOpenedForecast] = useState({})

  useEffect(() => {
    const weather = []
    ;(async function () {
      for (let city of cities) {
        weather.push(calculateDetails(await getForecast(city)))
      }
      setForecasts(weather)
    })()
  }, [cities, unit])

  console.log(forecasts)

  function handleClickOpen (forecast) {
    setOpen(true)
    setOpenedForecast(forecast)
  }
  const classes = useStyles()
  return (
    <>
      <Container maxWidth='md'>
        {forecasts.map(forecast => (
          <Card
            key={forecast.id}
            className={classes.card}
            color='primary'
            style={{ backgroundImage: forecast.background }}
          >
            <CardActionArea
              style={{ display: 'flex' }}
              onClick={() => handleClickOpen(forecast)}
            >
              <CardContent>
                <Description weather={forecast.weather[0]} />
              </CardContent>
              <CardContent className={classes.city}>
                <CityDetail forecast={forecast} />
              </CardContent>
              <CardContent className={classes.temperature}>
                <Temperature temperature={forecast.main[unit]} />
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Container>
      <DetailedWeather
        open={open}
        forecast={openedForecast}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
