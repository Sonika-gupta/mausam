const getTime = ({ timezone }) => {
  const date = new Date(Date.now() + timezone * 1000)
  return date.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getBackground = ({ icon, main }) => {
  let path1 = ''
  const path2 =
    'backgrounds/' + (icon[2] === 'd' ? 'day' : 'night') + '/clear.jpg'

  main = main.toLowerCase()

  if (main === 'rain' || main === 'snow') path1 = `backgrounds/${main}.svg`
  else if (main === 'fog') path1 = 'backgrounds/fog.png'
  else if (main === 'thunderstorm' || main === 'tornado')
    path1 = `backgrounds/${main}.jpg`

  return `url(${path1}), url(${path2})`
}

export { getTime, getBackground }
