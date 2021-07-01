import {
  GridList,
  GridListTile,
  Typography,
  makeStyles
} from '@material-ui/core'
import Tile from './Tile'
import { Time } from './SubComponents'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '50px',
    overflow: 'hidden'
  },
  gridList: {
    flexWrap: 'nowrap',
    borderTop: 'solid 1px white'
  },
  gridListTile: {
    margin: 'auto'
  }
})
export default function Hourly ({ forecast, unit, timezone }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant='overline'>Hourly Forecast</Typography>
      <GridList cols={4} spacing={0} className={classes.gridList}>
        {forecast.map((weather, i) => (
          <GridListTile cols={0.5} key={i}>
            <Tile
              weather={weather}
              unit={unit}
              children={
                <>
                  <hr style={{ width: '100%', margin: '10px 0' }} />
                  <Time timezone={timezone} dt={weather.dt} />
                </>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
