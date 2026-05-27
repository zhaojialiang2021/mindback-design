import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tokens.css' // 由 scripts/build-tokens.sh 生成，必须先于 index.css
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
