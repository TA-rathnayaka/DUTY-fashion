import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpCover from "../components/Signup/SignupCover/SignupCover";
import SignUpSideCover from "../components/Signup/SignupSideCover/LoginSideCover";
import axios from "axios";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    console.log(data);
    try {
      const response = await axios.post("/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setMessage("Signup successful");
        navigate(-1);
      }
    } catch (error) {
      setMessage("There was an error signing up!", error);
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
          }}
        >
          <SignUpSideCover />
          <div className="col-12 col-lg-6 col-xl-7">
            <div className="justify-content-center">
              <div className="col-lg-12">
                <h2 className="fw-bold mb-5">Sign up now </h2>
                <form onSubmit={handleSubmit}>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="form3Example1"
                            className="form-control"
                            values={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          <label className="form-label" for="form3Example1">
                            First name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="form3Example2"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => {
                              setLastName(e.target.value);
                            }}
                          />
                          <label className="form-label" for="form3Example2">
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" for="form3Example4">
                      Password
                    </label>
                  </div>
                  {message && (
                    <div className="alert alert-info mt-3">{message}</div>
                  )}
                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4"
                  >
                    Signup
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

export default Signup;
