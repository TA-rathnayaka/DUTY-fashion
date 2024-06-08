import React from "react";
import LoginCover from "../components/LoginCover/LoginCover";

function Login() {
  return (
    <section className="text-center">
      <LoginCover />
      <div
        className="card mx-4 mx-md-5 shadow-5-strong bg-body-tertiary"
        style={{
          marginTop: "-100px",
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="card-body py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-5">Login</h2>
              <form>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control"
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

                <div className="text-center">
                  <p>or Login with:</p>
                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-facebook-f dark-icon"></i>
                  </button>

                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-google"></i>
                  </button>

                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-github"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
