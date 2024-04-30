import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/300.css';
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-center" richColors />
    <App />
  </React.StrictMode>,
)
