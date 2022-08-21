import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import '../styles/index.scss'
import { AppRouting } from './AppRouting'
import { store } from './shared/store/store'

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouting />
    </Provider>
  </React.StrictMode>,
)
