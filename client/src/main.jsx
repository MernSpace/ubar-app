import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import './assets/css/bootstrap.css'
import "./assets/css/style.css";
import 'leaflet/dist/leaflet.css';

import { Toaster } from "react-hot-toast";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
    <StrictMode>
        <Provider store={store}>
            <App />
            <Toaster />
        </Provider>
    </StrictMode>
);