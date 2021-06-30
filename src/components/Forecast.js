import { useState, useEffect } from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography
} from '@material-ui/core'
import { WeatherIcon, Temperature, Time, Description } from './SubComponents'
import { makeStyles } from '@material-ui/core/styles'
import { getTime, getBackground, getTemp } from '../utils'

import { OneCallAPI as data } from '../sample-data.json'
const getForecast = loc => {
  console.log('fetching forecast', loc, data)
  return data
}
function setDetails (forecast, city) {
  Object.assign(forecast.current, getTemp(forecast.current))
  forecast.background = getBackground(forecast.current.weather[0])
  forecast.city = city
  return forecast
}

const useStyles = makeStyles({
  card: {
    margin: '5px auto'
  },
  city: {
    width: '70%',
    textAlign: 'left'
  },
  temperature: {
    margin: '5px'
  }
})

export default function Forecast ({ city, unit, onSelectForecast }) {
  console.log('Loaded city and unit')
  const [forecast, setForecast] = useState('')

  useEffect(() => {
    ;(async () => {
      setForecast(setDetails(await getForecast(city), city))
    })()
  }, [city])
  console.log('Loaded forecast')

  const classes = useStyles()
  return (
    <>
      {forecast && (
        <Card
          className={classes.card}
          color='primary'
          style={{ backgroundImage: forecast.background }}
        >
          <CardActionArea
            style={{ display: 'flex' }}
            onClick={() => onSelectForecast(forecast)}
          >
            <CardContent>
              <WeatherIcon weather={forecast.current.weather[0]} />
            </CardContent>
            <CardContent className={classes.city}>
              <Time timezone={forecast.timezone_offset} />
              <Typography variant='h5'>{forecast.city.name}</Typography>
            </CardContent>
            <CardContent className={classes.temperature}>
              <Temperature temperature={forecast.current[unit]} />
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  )
}
