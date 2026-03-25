import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@mui/material'

import { store } from './app/store'
import App from './App.tsx'
import theme from './theme' // 🔥 IMPORT YOUR THEME

import './styles/global.css'
import './styles/glassmorphism.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* 🔥 IMPORTANT */}
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)