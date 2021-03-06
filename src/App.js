import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";
import MainApp from "./containers/MainApp";
import moment from "moment";
// Helpers
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

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router primary={false} history={history}>
        <LastLocationProvider>
          <MainApp />
        </LastLocationProvider>
      </Router>
    </Provider>
  );
}

export default App;
