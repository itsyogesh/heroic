##Heroic - A React Redux NodeJS app to store games you play

###Basic Architecture
The idea is to create something better than the basic Todo app that showcases
how to use React Redux with a Express JS backend that are connected with an API.

I deliberately chose to use separate the backend and frontend so that I could
plugin a different backend as I am learning new frameworks.

####Getting Started

#####Installing dependencies
To install the frontend dependencies, go to the app directory.
```
cd app && yarn install
```
To install backend dependencies, go to the server directory.
```
cd server && npm install
```

#####Running the app
To start the UI, just `cd app` and `yarn start`

To start the backend, (CORS is already in place)
```
cd server
npm start
```
Now go to `http://localhost:3000`. You will see something like this for now.

![heroic.gif](https://media.giphy.com/media/l0IxZuMSSI7BMmc9O/source.gif)
