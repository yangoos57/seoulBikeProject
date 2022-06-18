import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Main from "./components/main";
import Test from "./components/test";
import MLMain from "./components/ml/mlmain";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Main />}></Route> */}
        <Route path="/test" element={<Test />}></Route>
        <Route path="/ml" element={<MLMain />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
