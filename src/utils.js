const getTime = (timezone, dt = Date.now()) => {
  console.log(dt, timezone)
  const date = new Date(dt + timezone * 1000)
  console.log(date)
  const x = date.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit'
  })
  console.log(x)
  return x
}

const getBackground = ({ icon, main, description }) => {
  const time = icon[2] === 'd' ? 'day' : 'night'
  let image1 = ''
  const image2 = 'backgrounds/' + time + '/clear.jpg'

  main = main.toLowerCase()

  // TODO: GET gif FOR EVERY PATH1
  if (main === 'rain' || main === 'snow') image1 = `backgrounds/${main}.svg`
  else if (main === 'fog') image1 = 'backgrounds/fog.png'
  else if (main === 'thunderstorm' || main === 'tornado')
    image1 = `backgrounds/${main}.jpg`
  else if (main === 'clouds') {
    image1 =
      description === 'scattered clouds'
        ? `backgrounds/${time}/${main}/scattered.gif`
        : `backgrounds/${time}/${main}/${description.split(' ')[0]}.jpg`
  }

  return (image1 ? `url(${image1}),` : '') + `url(${image2})`
}

function getTemp (weather) {
  return {
    metric: parseInt(weather.temp - 276.15),
    imperial: parseInt(((weather.temp - 276.15) * 9) / 5 + 32)
  }
}
export { getTime, getBackground, getTemp }
