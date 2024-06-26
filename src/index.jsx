import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import "./assets/css/admin/login.css";
import "./assets/css/admin/reset.css";
import "./assets/css/admin/layout.css";
import "./assets/css/admin/common.css";
import "./assets/css/admin/basic.css";
import './assets/css/bootstrap/css/bootstrap.css';

import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import reducer from "./reducer";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import { stopReportingRuntimeErrors } from "react-error-overlay";

//import { composeWithDevTools } from "redux-devtools-extension";
//https://kyuntechblog.tistory.com/41
const store = createStore(reducer);
store.dispatch({ type: 'ADD_NUM', data: 'test' });

const queryClient = new QueryClient();

if (process.env.NODE_ENV === "development") {
  //stopReportingRuntimeErrors(); // disables error overlays
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
)

