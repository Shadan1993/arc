import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
////////////
const root = ReactDOM.createRoot(
  document.getElementById("root"),
  (document.documentElement.lang = "fa"),
  (document.documentElement.dir = "rtl")
);
root.render(
  <CacheProvider value={cacheRtl}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CacheProvider>
);
