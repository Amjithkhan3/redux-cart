import React from "react";
import { Link } from "react-router-dom";

function Pnf() {
  return (
    <div className="container text-center" style={{ paddingTop: "120px" }}>
      <h1 className="fw-bold text-danger" style={{ fontSize: "90px" }}>
        404
      </h1>

      <h2 className="fw-bold mb-3">Page Not Found</h2>

      <p className="text-muted mb-4">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <Link to="/" className="btn btn-primary px-4 py-2">
        Go Back Home
      </Link>
    </div>
  );
}

export default Pnf;
