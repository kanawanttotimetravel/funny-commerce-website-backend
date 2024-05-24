import React from "react";
import "./cartcomponents-style.css";

function Slider() {
  return (
    <div
      id="cart-slider"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <label className="cart-slider-header" htmlFor="#">
        Cart
      </label>
      <div>
        <label className="label-home" htmlFor="">
          Home
        </label>
        <label className="label-cart" htmlFor="">
          Cart
        </label>
      </div>
    </div>
  );
}

export default Slider;
