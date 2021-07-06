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
    background: 'transparent',
    border: 'none',
    textAlign: 'center',
    padding: '5px',
    minWidth: '100px'
  }
})
export default function Daily ({ forecast, unit, timezone }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant='overline'>Daily Forecast</Typography>
      <GridList cols={4} spacing={0} className={classes.gridList}>
        {forecast.map(weather => (
          <GridListTile
            cols={0.5}
            key={weather.dt}
            className={classes.gridListTile}
          >
            <Tile weather={weather} unit={unit} type='daily' />
            <div>
              <hr style={{ width: '100%', margin: '10px auto' }} />
              <Day timezone={timezone} dt={weather.dt} />
            </div>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
