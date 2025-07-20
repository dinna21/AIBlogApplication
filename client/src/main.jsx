import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      {/* The App component is the main component of your application */}
      <App />
      {/* It can contain routes, context providers, and other components */}
    </AppProvider>
  </BrowserRouter>
)
