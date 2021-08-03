import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./components/CommonComponents/defaultStyles.css";
import store from "./redux/reduxStore";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect } from "react-router-dom";
import LogginingRouter from "./components/CommonComponents/LogginingRouter";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Redirect exact from="/" to="/login" />
        <LogginingRouter store={store.getState()} dispatch={store.dispatch} />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

window.store = store;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
