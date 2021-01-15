import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import MainApp from "./containers/MainApp";
import moment from "moment";
// Helpers
import setAuthToken from "./helpers/setAuthToken";
import history from "./helpers/history";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./store/auth/actions";

import "./App.css";
import "./assets/css/loading.css";
import "ldbutton/dist/ldbtn.min.css";
import "moment/locale/es";

moment.locale("es");

if (localStorage.token) setAuthToken(localStorage.token);

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
