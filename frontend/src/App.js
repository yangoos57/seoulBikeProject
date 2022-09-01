import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Main from "./components/main";
import MlMain from "./components/ml/pagemlmain";
import MlSearchPage from "./components/ml/pagemlsearch";
import MlDirection from "./components/ml/pagemldirection";
import MlTitle from "./components/ml/mltitle";
import BtTemplate from "./components/bt/pagebtdep";
import BtArrival from "./components/bt/pagebtarr";
import BtDirection from "./components/bt/pagebtdirection";
import BtTitle from "./components/bt/pagebttitle";
import DodoTitle from "./components/dodomoa/pagedodotitle";
import DodoMain from "./components/dodomoa/pagedodomain";
import DoDoResult from "./components/dodomoa/pagedodoresult";
// import "./App.css";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bikeTourTitle" element={<BtTitle />}></Route>
        <Route path="/bikeTour/departure" element={<BtTemplate />}></Route>
        <Route path="/bikeTour/arrival" element={<BtArrival />}></Route>
        <Route path="/bikeTour/direction" element={<BtDirection />}></Route>
        <Route path="/dodo" element={<DodoTitle />}></Route>
        <Route path="/dodo/main" element={<DodoMain />}></Route>
        <Route path="/dodo/searchresult" element={<DoDoResult />}></Route>
        {/* <Route path="/mltitle" element={<MlTitle />}></Route> */}
        {/* <Route path="/ml" element={<MlMain />}></Route> */}
        {/* <Route path="/ml/search" element={<MlSearchPage />}></Route> */}
        {/* <Route path="/ml/direction" element={<MlDirection />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
