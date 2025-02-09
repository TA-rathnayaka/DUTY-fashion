import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpCover from "../components/Signup/SignupCover/SignupCover";
import SignUpSideCover from "../components/Signup/SignupSideCover/LoginSideCover";
import axios from "axios";
import { useAuth } from "../Providers/AuthProvider";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await signup(
      firstName,
      lastName,
      email,
      password
    );
    setMessage(message);
    if (success) {
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <SignUpCover />
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
          <SignUpSideCover />
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
                    fontSize: "1.25rem", // h5 size
                    fontWeight: "normal",
                    marginBottom: "2rem",
                  }}
                >
                  Sign up now
                </h2>
                <form onSubmit={handleSubmit}>
                  <div data-mdb-input-init style={{ marginBottom: "1rem" }}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div
                          data-mdb-input-init
                          style={{ marginBottom: "1rem" }}
                        >
                          <input
                            type="text"
                            id="form3Example1"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            style={{
                              fontSize: "0.875rem", // Smaller font size for input fields
                            }}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1"
                            style={{
                              fontSize: "0.875rem", // Match font size with input
                            }}
                          >
                            First name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div
                          data-mdb-input-init
                          style={{ marginBottom: "1rem" }}
                        >
                          <input
                            type="text"
                            id="form3Example2"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            style={{
                              fontSize: "0.875rem", // Smaller font size for input fields
                            }}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example2"
                            style={{
                              fontSize: "0.875rem", // Match font size with input
                            }}
                          >
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div data-mdb-input-init style={{ marginBottom: "1rem" }}>
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          fontSize: "0.875rem", // Smaller font size for input fields
                        }}
                      />
                      <label
                        className="form-label"
                        htmlFor="form3Example3"
                        style={{
                          fontSize: "0.875rem", // Match font size with input
                        }}
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
                          fontSize: "0.875rem", // Smaller font size for input fields
                        }}
                      />
                      <label
                        className="form-label"
                        htmlFor="form3Example4"
                        style={{
                          fontSize: "0.875rem", // Match font size with input
                        }}
                      >
                        Password
                      </label>
                    </div>
                    {message && (
                      <div
                        className="alert alert-info mt-3"
                        style={{ fontSize: "0.875rem" }} // Match font size with other text
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
                        fontSize: "0.875rem", // Smaller font size for button text
                      }}
                    >
                      Signup
                    </button>
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

export default Signup;
