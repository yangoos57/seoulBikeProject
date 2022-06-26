import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Test from "./components/test";
import Main from "./components/main";
import MlMain from "./components/ml/pagemlmain";
import MlSearchPage from "./components/ml/pagemlsearch";
import MlDirection from "./components/ml/pagemldirection";
import MlTitle from "./components/ml/mltitle";
import BkTitle from "./components/bk/bktitle";
import BkTemplate from "./components/bk/bktemplate";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/dash" element={<Main />}></Route>
        {/* <Route path="/" element={<BkTitle />}></Route> */}
        <Route path="/bk" element={<BkTemplate />}></Route>
        <Route path="/" element={<MlTitle />}></Route>
        <Route path="/ml" element={<MlMain />}></Route>
        <Route path="/ml/search" element={<MlSearchPage />}></Route>
        <Route path="/ml/direction" element={<MlDirection />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
