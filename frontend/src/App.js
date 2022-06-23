import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Main from "./components/main";
import Test from "./components/test";
import MLMain from "./components/ml/mlmain";
import MLMain2 from "./components/ml/mlmain2";
import MlSearch from "./components/ml/mlsearch";
import MlSearch2 from "./components/ml/mlsearch2";
import MlSearchPage from "./components/ml/mlsearchpage";
import MlMap from "./components/ml/mlmap";
import MlMapCard from "./components/ml/mlmapcard";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Main />}></Route> */}
        <Route path="/test" element={<Test />}></Route>
        <Route path="/ml" element={<MlMap />}></Route>
        <Route path="/ml/search" element={<MlSearchPage />}></Route>
        <Route path="/ml/mapcard" element={<MlMapCard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
