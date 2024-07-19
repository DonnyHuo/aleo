import Header from "./components/header";
import Footer from "./components/footer";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Mine from "./pages/Mine";
import Raise from "./pages/Raise";
import About from "./pages/About";
import Black from "./pages/Black";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mine" element={<Mine />}></Route>
          <Route path="/raise" element={<Raise />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Black" element={<Black />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
