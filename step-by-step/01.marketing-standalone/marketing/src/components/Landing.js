import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <React.Fragment>
      <div>
        <Link to="/pricing">
          <button>Pricing</button>
        </Link>
      </div>
      <h1>Home</h1>
      <img src="https://source.unsplash.com/random" width="400" />
    </React.Fragment>
  );
}
