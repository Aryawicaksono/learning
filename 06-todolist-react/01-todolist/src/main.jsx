import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/color.css';
import './styles/reset.css';
import './index.css'

import { App } from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
