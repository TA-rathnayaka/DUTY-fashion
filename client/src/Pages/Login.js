import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginCover from "../components/Login/LoginCover/LoginCover";
import LoginSideCover from "../components/Login/LoginSideCover/LoginSideCover";

function Login({ updateLoginState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email, password };
    try {
      const response = await axios.post("/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setMessage("Sign in successful");
        const isAdmin = response.data.isAdmin || false;
        updateLoginState(true, isAdmin);
        navigate("/", { replace: true });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage("Email already exists or invalid credentials");
      } else {
        setMessage("There was an error signing in. Please try again.");
      }
      console.error("There was an error signing in!", error);
    }
  };

  return (
    <>
      <LoginCover />
      <div className="container">
        <div
          className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center shadow"
          style={{
            marginTop: "-100px",
            backdropFilter: "blur(30px)",
            backgroundColor: "#ffffffa0",
            borderRadius: "8px", // Rounded corners for the shadow container
          }}
        >
          <LoginSideCover />
          <div className="col-12 col-lg-6 col-xl-7">
            <div
              className="justify-content-center"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="col-lg-12">
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "normal",
                    marginBottom: "2rem",
                  }}
                >
                  Login
                </h2>
                <form onSubmit={handleSubmit}>
                  <div data-mdb-input-init style={{ marginBottom: "1rem" }}>
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        fontSize: "0.875rem",
                      }}
                    />
                    <label
                      className="form-label"
                      htmlFor="form3Example3"
                      style={{ fontSize: "0.875rem" }}
                    >
                      Email address
                    </label>
                  </div>

                  <div data-mdb-input-init style={{ marginBottom: "1rem" }}>
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        fontSize: "0.875rem",
                      }}
                    />
                    <label
                      className="form-label"
                      htmlFor="form3Example4"
                      style={{ fontSize: "0.875rem" }}
                    >
                      Password
                    </label>
                  </div>
                  {message && (
                    <div
                      className="alert alert-info mt-3"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {message}
                    </div>
                  )}
                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4"
                    style={{
                      fontSize: "0.875rem",
                    }}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
