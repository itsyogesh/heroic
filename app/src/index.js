import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router'
import App from './App'
import rootReducer from './rootReducer'
import './index.css'


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
