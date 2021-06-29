import { useState, useEffect } from 'react'
import { Card, CardActionArea, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Description, CityDetail, Temperature } from './SubComponents'
import { calculateDetails } from '../utils'
// import getForecast from '../api/getForecast'

import { WeatherForecastAPI as data } from '../sample-data.json'
const getForecast = loc => {
  console.log('fetching forecast')
  return data[loc.name.toLowerCase()] || data['london']
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

export default function Forecast ({ city, unit, onSelect }) {
  console.log('city:', city, 'unit', unit)
  const [forecast, setForecast] = useState('')

  useEffect(() => {
    ;(async function () {
      setForecast(calculateDetails(await getForecast(city)))
    })()
    console.log(forecast)
  }, [city])

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
            onClick={() => onSelect(forecast)}
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
      )}
    </>
  )
}
