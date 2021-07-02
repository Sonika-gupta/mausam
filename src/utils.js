const getTime = (timezone, dt) => {
  const date = dt ? new Date(dt * 1000) : new Date()
  return date.toLocaleTimeString('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getDay = (timezone, dt) => {
  /* const date = new Date(dt)
   return new Intl.DateTimeFormat('en', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    timeZone: timezone
  }).format(date) */
  const date = new Date(dt * 1000)
  return date.toLocaleDateString('en-US', {
    timeZone: timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
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

function getTemp (temp) {
  return {
    metric: parseInt(temp - 276.15),
    imperial: parseInt(((temp - 276.15) * 9) / 5 + 32)
  }
}
export { getTime, getDay, getBackground, getTemp }
