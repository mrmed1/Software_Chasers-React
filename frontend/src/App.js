
import "./App.css";

import Login from "./components/login/Login";
import {Route, Routes} from "react-router-dom";
import React from "react";
import Hello from "./components/Hello";

function App() {

    return (
        <div className="App">

            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/students" element={<Hello/>}/>
            </Routes>

        </div>

    )
}

export default App;
