import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const submithandler = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email required.");
    } else if (email) {
      setError(null);
    }
  };
  return (
    <>
      <div className="container p-0 bg-white my-3">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <img
              src="/assets/login/Picture2.jpg"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="loginMain py-lg-5">
              <div className="loginForm">
                <h3 className="userType">Forgot Password</h3>
                <form className="form" onSubmit={submithandler}>
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control mb-3 "
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && <span style={{ color: "red" }}>{error}</span>}
                  <div className="loginButton">
                    <button type="submit">Send Request</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
