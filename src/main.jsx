import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
// import { AuthProvider } from './AuthContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AuthProvider> */}
        <App />
      {/* </AuthProvider> */}
    </Provider>
  </React.StrictMode>,
)
