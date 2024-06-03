import React from "react";
import Navbar from "./Navbar";
import HomePageContent from "./HomePageContent";

function App() {
  return (
    <div className="App">
      <Navbar items={["Blog", "Contacts"]} />
      <HomePageContent />
    </div>
  );
}

export default App;
