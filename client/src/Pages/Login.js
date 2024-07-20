import React, { useState } from "react";
import axios from "axios";
import LoginCover from "../components/Login/LoginCover/LoginCover";
import LoginSideCover from "../components/Login/LoginSideCover/LoginSideCover";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    console.log(data);
    try {
      const response = await axios.post("/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Sign in successful");
      }
    } catch (error) {
      console.error("There was an error sign in!", error);
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
          }}
        >
          <LoginSideCover />
          <div className="col-12 col-lg-6 col-xl-7">
            <div className="justify-content-center">
              <div className="col-lg-12">
                <h2 className="fw-bold mb-5">Login</h2>
                <form onSubmit={handleSubmit}>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <label className="form-label" for="form3Example3">
                      Email address
                    </label>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <label className="form-label" for="form3Example4">
                      Password
                    </label>
                  </div>

                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4"
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
