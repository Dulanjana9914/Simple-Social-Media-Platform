import React, { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";

function NotFound() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      {loading ? (
        <div className="load">
          <RiseLoader color={"#FEA82F"} loading={loading} size={30} />
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3">
              {" "}
              <span className="text-danger">Opps!</span> Page not found.
            </p>
            <p className="lead">The page you’re looking for doesn’t exist.</p>
            <a href="/login" className="btn btn-warning">
              Go To Login
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotFound;
