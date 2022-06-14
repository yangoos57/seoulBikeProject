import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios'
import Main from './components/main'

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
function App() {
	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" element={<Main/>}>
			</Route>
		</Routes>
		</BrowserRouter>
	);
}

export default App;