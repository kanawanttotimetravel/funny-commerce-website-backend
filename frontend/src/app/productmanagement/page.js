import React from "react";
import "./style.css";
import SubButton from "@/components/adminComponents/SubButton";

function App() {
  return (
    <div className="App">
      <div>
        <h1 className="header">PRODUCT MANAGEMENT</h1>
        <SubButton buttonText="Insert product" />
        <SubButton buttonText="Delete product" />
        <SubButton buttonText="Update product" />
      </div>
    </div>
  );
}

export default App;
