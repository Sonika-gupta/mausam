# Mausam

Weather App made with _React_ using **Material UI**.<br/>
Deployed with github pages:<br/>
[sonika-gupta.github.io/mausam](https://sonika-gupta.github.io/mausam)

## Layout

> APP

- Cards Container

  - Forecast Card (clickable)
    shows:
    - Time according to timezone
    - Weather Description icon
    - City name
    - Temperature

- Functions Container
  - Unit Switch b/w Fahrenheit and Celcius
  - Search city

> DETAILED WEATHER CARD

- Container
  - Actions
    - Unit Switch [Synced with switch on Main Page]
    - Add Button if city is not stored
    - Done Button to exit the dialog
  - Current
    - City Details
    - Weather icon
    - Temp
  - Hourly Forecast
    - Tiles
    - Time
  - Daily Forecast
    - Tile shows:
      - Weather Description Icon
      - Temperature
      - Weather Description Text
    - Day
  - Day Details (shows details like sunrise, sunset, rain, humidity, etc.)

> SEARCH DIALOG

- Search bar => autocomplete

## APIs

For detailed Weather: OpenWeatherMap One Call API.\
input: city coordinates\
output: (checkout "OneCallAPI" in /src/sample-data.json)

For Search Places: Spott API on rapidapi.com

## Code Flow

```
app loads
=> get cities from local storage
if (!cities) {
    access current location
    if (location) {
      => set cities to current location
    }
    else {
        open search dialog
    }
}
=> show Forecast cards of cities
=> onclick: open detailed weather

onSearch:
=> display list of search options
  on selecting city
    => open detailed weather with button to 'ADD' city
      onAdd
        => add the city to stored cities close the dialog
```

## TODO:

1. Delete button on cities
2. Show Minimum Maximum Temperatures
3. Loading Icon
4. Drag and drop Rearrange



*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*
