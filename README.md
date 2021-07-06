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

## Code FLow

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

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Runs the predeploy script i.e.;
Builds the app for production to the `build` folder.

The build folder is committed to the branch mentioned in github pages settings of repo.\
Deploys the app on mentioned {username}.github.io/{repo-name}

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
