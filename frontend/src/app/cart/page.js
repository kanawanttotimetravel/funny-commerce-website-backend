import React from "react";
import "./cart-style.css";
import Content from "@/components/cartcomponents/CartBody";
import Slider from "@/components/cartcomponents/CartSlider";
import Footer from "@/components/footer/footer";
import Header from "@/components/headercomponent/HeaderComponent";

function App() {
  return (
    <div className="App">
      <Header/>
      <div>
        <Slider></Slider>
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default App;
