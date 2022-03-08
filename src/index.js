import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
// import store from "./Store"

ReactDOM.render(
  <React.StrictMode>
     <App />
    {/* <Provider store={store}>
     
    </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
)
