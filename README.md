
# TFL PROJECT
A small single page web app that allows the user to access information regarding London’s transportation

<img width="843" alt="TFL" src="https://user-images.githubusercontent.com/17074304/140276570-724de86d-0bda-46cd-90a1-2ee25a4d023c.png">

## Menu:
- Shows TFL services in a menu format retrieved using the TFL api
Get Service Status Request:
GET
https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true
Response:
An array of objects, each representing a tfl service and its status detail

- Displays the name value from the service object
- Next to the name there is a visual cue if the services operate in the evenings/night - this is given by any object in the serviceTypes array that has a
value of “Night”
- Also next to the name of the service there is a visual cue if the service is facing a disruption - this is determined through any object in the lineStatuses array that has a statusSeverity value that’s a different value than 10

## Main Section:

- A header shows “No Service Disruptions” if no object in the lineStatuses array has a statusSeverity value that’s a different value than 10

- A header showing “Service currently suffering disruptions”, followed by a list of every current disruption’s description, extracted from the reason value on each
object inside the lineStatuses array with a statusSeverity value different than 10

## Cycle Hire Option:
- A Cycle Hire option appears after all the other services, it is a button that calls

Search Bike Points Request:
GET https://api.tfl.gov.uk/BikePoint/Search?query=regent
Response:
An array of objects, each representing a bike point that matched the
search term. Empty array if none was found.

## TODO

■ The menu items will be ordered firstly by modeName & then by name <- potentially using React HOC to add functionality to the list

■ Add search box where the user can enter a text and have returned the bike points that match the search.

■ The main content section at the top will clear the Line Disruption and display the results of this search as a list,
showing the id of the bike point followed by its commonName value and then by its coordinates, eg: 76 Great Portland Street, (55.533595, -0.1344083)

■ If there are no search results - a header saying “No bike points found for ‘search term’”

■ Add some level of caching if the user uses the same term <- useCallBack potentially

■ Persist this on refresh <-- potentially using local storage 

■ Refactor to show example with Redux

■ Improve UI

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

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

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
