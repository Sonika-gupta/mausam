import { useState } from 'react'
import './App.css'
import Forecast from './components/Forecast'

function App () {
  return (
    <div className='App'>
      <Forecast></Forecast>
      <footer>Page created by SG &#169;2021</footer>
    </div>
  )
}

export default App
