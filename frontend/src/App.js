import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Main from "./components/main";
import MlMain from "./components/ml/pagemlmain";
import MlSearchPage from "./components/ml/pagemlsearch";
import MlDirection from "./components/ml/pagemldirection";
import MlTitle from "./components/ml/mltitle";
// import BkTitle from "./components/bk/bktitle";
import BkTemplate from "./components/bk/pagebkdep";
import BkArrival from "./components/bk/pagebkarrival";
import BkDirection from "./components/bk/pagebkdirection";
import Test from "./components/test";
import BkTitle from "./components/bk/bktitle";
import PoMainFrame from "./components/portfolio/pomainframe";
import PoAbout from "./components/portfolio/poabout";
import PoProject from "./components/portfolio/poproject";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/" element={<PoAbout />}></Route>
        <Route path="/Project" element={<PoProject />}></Route>
        <Route path="/dash" element={<Main />}></Route>
        <Route path="/bktitle" element={<BkTitle />}></Route>
        <Route path="/bk/departure" element={<BkTemplate />}></Route>
        <Route path="/bk/arrival" element={<BkArrival />}></Route>
        <Route path="/bk/direction" element={<BkDirection />}></Route>
        <Route path="/mltitle" element={<MlTitle />}></Route>
        <Route path="/ml" element={<MlMain />}></Route>
        <Route path="/ml/search" element={<MlSearchPage />}></Route>
        <Route path="/ml/direction" element={<MlDirection />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
