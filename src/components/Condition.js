const Condition = ({ weather }) => {
  console.log('condition:', weather)
  return (
    <div>
      <h1>{weather.main.temp}</h1>
      <h2>{weather.weather[0].description}</h2>
    </div>
  )
}

export default Condition
