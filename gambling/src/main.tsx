import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

type RouletteContextState = {
  value: string,
  message: string,
  currentAccount: string,
  currentBalance: string,
  manager: string,
};

const initialState = {
  value: "",
  message: "",
  currentAccount: "",
  currentBalance: "",
  manager: "0x3daebbDFf1eA3491224684b8f862DCa0946A8174"
};

const RouletteContext = createContext<RouletteContextState>({} as RouletteContextState);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouletteContext.Provider value={initialState}>
      <App />
    </RouletteContext.Provider>
  </React.StrictMode>
)
