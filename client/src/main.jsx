import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { appStore } from './app/store'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import ThemeProvider from './context/themeContext'



const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // ✅ Create root once

root.render(
    <Provider store={appStore}>
      <ThemeProvider>
          <App />
          <Toaster />
      </ThemeProvider>
    </Provider>
);
Animation