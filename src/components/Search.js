/* eslint-disable no-use-before-define */
import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

export default function Search () {
  const [options, setOptions] = useState([])
  function updateOptions (e) {
    console.log(e.target.value)
    /* setOptions(
      cityList
        .filter(cities => cities.name.includes(e.target.value))
        .map(el => el.name)
    ) */
    setOptions([])
    console.log(options)
  }
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        options={options}
        renderInput={params => (
          <TextField
            {...params}
            onChange={updateOptions}
            margin='normal'
            variant='outlined'
          />
        )}
      />
    </div>
  )
}
