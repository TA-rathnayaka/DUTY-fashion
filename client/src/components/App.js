import React from "react";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <Navbar items={["Home", "Login", "About"]} />
    </div>
  );
}

export default App;
