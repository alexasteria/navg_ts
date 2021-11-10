import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import thunk from "redux-thunk";
import App from "./App";
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./store/rootReducer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

// Init VK  Mini App
bridge.send("VKWebAppInit");
let linkParams = window.location.hash
  .replace("#", "")
  .split("&")
  .reduce(function (p, e) {
    let a = e.split("=");
    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
    return p;
  }, {});
let launchParams = window.location.search;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App launchParams={launchParams} linkParams={linkParams} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
