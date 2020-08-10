import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import MainApp from "./components/MainApp";
// Helpers
import setAuthToken from "./helpers/setAuthToken";
import history from "./helpers/history";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

import "./App.css";
import "./assets/css/loading.css";
import "ldbutton/dist/ldbtn.min.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router primary={false} history={history}>
        <MainApp />
      </Router>
    </Provider>
  );
}

export default App;
