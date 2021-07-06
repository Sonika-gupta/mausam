import { Container, Grid, Typography } from '@material-ui/core'
import { Temperature, Description } from './SubComponents'

export default function Current ({ forecast, unit }) {
  return (
    <>
      <Container>
        <Typography variant='h6' align='center'>
          {forecast.city?.name},
          <Typography
            variant='body1'
            component='span'
            style={{ paddingLeft: '5px' }}
          >
            {forecast.city?.country?.id}
          </Typography>
        </Typography>
      </Container>
      <Grid
        container
        style={{
          background: 'transparent',
          border: 'none',
          margin: 'auto'
        }}
        justify='space-evenly'
        spacing={2}
      >
        <Grid item>
          <Temperature temperature={forecast.current[unit]} variant='h2' />
        </Grid>
        <Container>
          <Description weather={forecast.current.weather[0]} />
        </Container>
      </Grid>
    </>
  )
}
