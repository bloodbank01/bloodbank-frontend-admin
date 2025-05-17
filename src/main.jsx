import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './Redux/Store.jsx'
import { SuccessProvider } from './Common/Toasts/SuccessProvider.jsx'
import { AlertProvider } from './Common/Toasts/AlertProvider.jsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { LoaderProvider } from './Common/Loader/useLoader.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-datepicker/dist/react-datepicker.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
        <SuccessProvider>
          <AlertProvider>
            <LoaderProvider>
            <GoogleOAuthProvider clientId="86258795000-n52rau1ags61mo9doj97na8h9abf8vv6.apps.googleusercontent.com">
              <App />
              </GoogleOAuthProvider>
            </LoaderProvider>
          </AlertProvider>
        </SuccessProvider>
    </Provider>
  </BrowserRouter>
)
