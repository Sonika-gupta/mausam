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
    borderTop: 'solid 1px white',
    borderBottom: 'solid 1px white'
  },
  gridListTile: {
    background: 'transparent',
    border: 'none',
    textAlign: 'center',
    padding: '5px',
    minWidth: '100px'
  }
})
export default function Hourly ({ forecast, unit, timezone }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant='overline'>Hourly Forecast</Typography>
      <GridList cols={4} spacing={0} className={classes.gridList}>
        {forecast.map((weather, i) => (
          <GridListTile cols={0.5} key={i} className={classes.gridListTile}>
            <Tile weather={weather} unit={unit} />
            <div>
              <hr style={{ width: '100%', margin: '10px auto' }} />
              <Time timezone={timezone} dt={weather.dt} />
            </div>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
