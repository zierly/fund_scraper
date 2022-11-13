/*
 * @Author: 自迩
 * @Date: 2022-06-06 21:01:15
 * @LastEditTime: 2022-11-10 13:24:59
 * @LastEditors: your name
 * @Description:
 * @FilePath: \fund_view\src\App.js
 */

import './App.css';
import {Link, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'
import HomePage from './pages/homePage';

axios.defaults.baseURL = 'http://127.0.0.1:3001'

function App() {
  return (
    <div className="App">

    <Routes>
      <Route path = "/" element = {<Navigate to = "/homePage"/>}></Route>
      <Route path = "/homePage" element = {<HomePage/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
