import Header from "./components/header";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Mine from "./pages/Mine";
import Raise from "./pages/Raise";
import About from "./pages/About";
import Black from "./pages/Black";
import Invite from "./pages/Invite";
import Team from "./pages/Team";
import Pledge from "./pages/Pledge";
import Computing from "./pages/Computing";



function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mine" element={<Mine />}></Route>
          <Route path="/raise" element={<Raise />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/black" element={<Black />}></Route>
          <Route path="/invite" element={<Invite />}></Route>
          <Route path="/team" element={<Team />}></Route>
          <Route path="/pledge" element={<Pledge />}></Route>
          <Route path="/computing" element={<Computing />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
