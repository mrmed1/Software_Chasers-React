import Box from '@mui/material/Box';
import { useState } from "react";
import { Route, Routes,redirect } from "react-router-dom";
import "./App.css";

import ListEtudiant from "./components/CrudEtudiant/ListEtudiant";

function App() {

    return (
          <div className="App">
              <ListEtudiant/>
          </div>

    )
}

export default App;
