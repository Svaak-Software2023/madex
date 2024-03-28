import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
const App = React.lazy(()=>import('./App.jsx')) 
import './index.css'
import {HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Loading from './assets/loader/Loading.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <HashRouter>
  <Suspense fallback={<Loading/>}>
  <Provider store={store}>
    <App />
  </Provider>
  </Suspense>
  </HashRouter>
  </React.StrictMode>,
)
