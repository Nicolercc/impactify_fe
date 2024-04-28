
import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProv from "./Provider/AuthProv.jsx";
import App from './App.jsx'
import { SocketProvider } from '../src/Components/Socket/SocketIO.jsx'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
   <AuthProv>
    <App />
  </AuthProv>
    </SocketProvider>
  </React.StrictMode>,
)
