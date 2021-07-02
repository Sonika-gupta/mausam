import {
  GridList,
  GridListTile,
  Typography,
  makeStyles
} from '@material-ui/core'
import Tile from './Tile'
import { Day } from './SubComponents'

const useStyles = makeStyles({
  root: {
    marginTop: '50px',
    overflow: 'hidden',
    width: '100%'
  },
  gridList: {
    flexWrap: 'nowrap',
    borderTop: 'solid 1px white',
    borderBottom: 'solid 1px white',
    width: '100%'
  },
  gridListTile: {
    margin: 'auto'
  }
})
export default function Daily ({ forecast, unit, timezone }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant='overline'>Daily Forecast</Typography>
      <GridList cols={4} spacing={0} className={classes.gridList}>
        {forecast.map(weather => (
          <GridListTile cols={0.5} key={forecast.dt}>
            <Tile
              weather={weather}
              unit={unit}
              type='daily'
              children={
                <>
                  <hr style={{ width: '100%', margin: '10px 0' }} />
                  <Day timezone={timezone} dt={weather.dt} />
                </>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
