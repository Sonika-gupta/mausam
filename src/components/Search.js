import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  TextField
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { getSearchOptions } from '../api/places'

/* function useDebounce (value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
} */

export default function Search ({ open, onClose, onSelect }) {
  const [options, setOptions] = useState([])
  const [value, setValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  /*   const [debouncedQuery, setDebouncedQuery] = useDebounce(value, 500)
  useEffect(() => {
    if (debouncedQuery) {
      setIsSearching(true)
      getSearchOptions(debouncedQuery).then(result => {
        setIsSearching(false)
        setOptions(result)
      })
    } else {
      setOptions([])
      setIsSearching(false)
    }
    console.log(options)
  }, [debouncedQuery]) */

  useEffect(() => {
    if (!isSearching && value) {
      setIsSearching(true)
      getSearchOptions(value).then(result => {
        console.log(result)
        setIsSearching(false)
        setOptions(result)
      })
    }
  }, [value])

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
          onChange={(e, newValue) => {
            onSelect(newValue)
            onClose()
          }}
          onInputChange={e => setValue(e.target.value)}
          filterOptions={(options, state) => options}
          renderInput={params => (
            <TextField
              {...params}
              style={{ width: '100%' }}
              margin='normal'
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
      </DialogContent>
    </Dialog>
  )
}
