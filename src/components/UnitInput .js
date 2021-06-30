import Switch from '@material-ui/core/Switch'

export default function UnitInput ({ unit, updateUnit }) {
  return (
    <span style={{ float: 'left', color: 'white' }}>
      &deg;F
      <Switch
        checked={unit === 'metric'}
        onChange={(e, isMetric) => updateUnit(isMetric ? 'metric' : 'imperial')}
        name='unit'
      />
      &deg;C
    </span>
  )
}
