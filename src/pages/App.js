import React, { Suspense } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import PagesRoutes from "../routes";
import { persistor, store } from "../store";
import "../css/index.css";

function App() {
  return (
    <Suspense fallback={"Loading or we can add component here"}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <PagesRoutes />
        </PersistGate>
      </Provider>
    </Suspense>
  );
}
export default App;
