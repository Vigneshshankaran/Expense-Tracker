import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="container-landing">
      <div className="landing-top">
        <h1>Expense Tracker</h1>
        <div>
          <Link to="/login" className="landing-btn">
            LOGIN
          </Link>
          <Link to="/register" className="landing-btn">
            REGISTER
          </Link>
        </div>
      </div>
      <div className="landing-bottom">&copy;Copyright 2022 Souvik Goon </div>
    </div>
  );
}

export default LandingPage;
