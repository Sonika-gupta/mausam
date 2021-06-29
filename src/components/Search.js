import { useState } from 'react'
import {
  Dialog,
  // DialogActions,
  DialogContent,
  DialogContentText,
  TextField
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
// import getSearchOptions from '../api/getSearchOptions'

import { del as data } from '../sample-data.json'
function getSearchOptions (query) {
  console.log(query)
  return data
}

export default function Search ({ open, onClose, onSelect }) {
  const [options, setOptions] = useState([])
  let value = ''
  function updateOptions (e) {
    console.log(e.target.value)
    setOptions(getSearchOptions(e.target.value))
    console.log(options)
  }

  function handleClose () {
    setOptions([])
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogContent>
        <DialogContentText variant='subtitle2'>
          Enter City Name
        </DialogContentText>
        <Autocomplete
          options={options}
          getOptionLabel={el => el && el.name}
          value={value}
          onChange={(e, newValue) => onSelect(newValue)}
          renderInput={params => (
            <TextField
              {...params}
              style={{ width: '100%' }}
              onChange={updateOptions}
              margin='normal'
            />
          )}
        />
      </DialogContent>
    </Dialog>
  )
}
