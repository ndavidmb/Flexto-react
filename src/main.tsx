import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import '../styles/index.scss'
import { AppRouting } from './router/AppRouter'
import { store } from './shared/store/store'

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <Provider store={store}>
    <AppRouting />
  </Provider>,
)
