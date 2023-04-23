# Workplace Simulator

A web-based 3D Simulator designed to help workplaces more efficiently manage their employees and resources.

# Installation Guide

Refer to the "Getting Started with Create React App" below for more details. A very brief installation guide is provided here.

## Downloading Node.js and npm

- Go to [this link](https://nodejs.org/en/download) to download Node.js and npm in order to run our program on your own device.

## Install Package Dependencies

- Run `npm install` on the project directory to install necessary package dependencies for this project. Package dependencies are stored in the "package.json" and "package-lock.json" files in the directory.

## Run the Application

- Run `npm start` to start the application. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

## Update Package Dependencies

- Run `npm outdated` to view outdated packages.
- Run `npm update` to update them.

# Release Notes
## Version 0.5.0

### Features

- Workers are now clickable when the simulation is paused
- After moving furniture items, users can click the save button to attempt to save it
- The save button saves the new positions of the furniture items if no overlap is detected, otherwise a popup will appear indicating failure

### Bug Fixes

- Worker movement is bounded by the room boundary
- Furniture movement is bounded by the room boundary, and the new positions cannot be saved if there is overlap
- API calls are changed to retrieve and update data from/to new directus slug

### Known Issues

- New furniture items and new workers have to be added manually via directus, not from the application UI

## Version 0.4.0

### Features

- User can select one or multiple furniture items and move them using arrow keys
- Panel on left side has buttons with table, chair, and worker icons respectively
- Buttons on panel create a new instance of whatever object is pictured on the button when pressed. Object will start at (0,0) and on the ground
- When objects are clicked on, a panel is created on the right hand side with info about the object
- Info panel includes a delete button which removes the object from the simulation
- Whenever a highlighted object is clicked on, the info panel is removed if it was there before
- Features/attributes for the primary workstation have been added to the Directus backend

### Bug Fixes

- Simulation is less jittery

### Known Issues


## Version 0.3.0

### Features

- Import/Export Functionality added to directus database
- Data is vizualized in 3d space with floors defining the space
- Furniture and workers are also visualized in the space
- User can move within the 3d space their simulation will run in
- Workers move around autonomously as they are run by simulation algorithm (more sophisticated algorithm will be made in a later update)
- Simulation can be sped up, slowed down, paused, and played
- Colors and style has been updated to look like Figma prototype
- Directus database has been updated to contain data consistent with ERD

### Bug Fixes

- NULL or incorrectly formatted simulation IDs will now result in a popup error

### Known Issues


## Version 0.2.0

### Features

- Utils page for authorized administrators has been removed.
- Simulation login page has been added
- Frontend data visualization enables
- Webpage pulls data from Directus backend

### Bug Fixes

- Admin utils page was removed, simulation login page was added

### Known Issues

- Simulation ID filter needs to be worked on

## Version 0.1.0

### Features

- Utils page for authorized administrators to manage users has been created.
- Database schema has been set up for simulation instances.
- Admin login page has been created.

### Bug Fixes

N/A

### Known Issues

- The admin utils page is not connected to the backend database yet, and the page contains only dummy data that cannot be changed at the moment. We will fix this problem once the web application is connected to our directus.io database.

#
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

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
