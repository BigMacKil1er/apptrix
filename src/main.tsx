import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './index.css'
import './i18n'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback="...loading">
      <App/>
    </Suspense>
  </React.StrictMode>,
)
