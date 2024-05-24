import React from "react";
import "./admin-style.css"; // Import your CSS file

function SubButton({ buttonText }) {
  // Add buttonText prop
  return (
    <div>
      <div className="admin-button">
        <a href="#" className="text-admin">
          {buttonText} {/* Access the prop value here */}
        </a>
      </div>
    </div>
  );
}

export default SubButton;
