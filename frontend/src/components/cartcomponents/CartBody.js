import React from "react";
import "./cartcomponents-style.css"; // Import your CSS file

function Content() {
  return (
    <div className="container">
      <div className="block block-left">
        <ProductTable />
      </div>
      <div className="block block-right">
        <CartTotals />
      </div>
    </div>
  );
}

function ProductTable() {
  const products = [
    {
      img: "https://i.pinimg.com/564x/25/3f/80/253f800eb997f9862e3f95f473ccccd8.jpg",
      name: "Ranpo Edogawa",
      price: 250000,
      quantity: 1,
      subtotal: 250000,
    },
  ];

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th className="image"></th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th className="trash"></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow key={product.name} product={product} />
        ))}
      </tbody>
    </table>
  );
}

const ProductRow = ({ product }) => {
  return (
    <tr>
      <td className="image">
        <img src={product.img} alt="" />
      </td>
      <td>{product.name}</td>
      <td>Rs. {product.price}.00</td>
      <td>{product.quantity}</td>
      <td>Rs. {product.subtotal}.00</td>
      <td className="trash">trash icon</td>
    </tr>
  );
};

function CartTotals() {
  return (
    <div className="cart-totals">
      <h2>Cart Totals</h2>
      <div className="subtotal">
        <span>Subtotal</span>
        <span>Rs. 250,000.00</span>
      </div>
      <div className="total">
        <span>Total</span>
        <span>Rs. 250,000.00</span>
      </div>
      <button className="checkout-btn">Check Out</button>
    </div>
  );
}

export default Content;
