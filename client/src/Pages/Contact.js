import React from "react";
import ContactCover from "../components/ContactCover/ContactCover";
import SideCover from "../components/About/AboutSideCover/AboutSideCover";

function Contact() {
  return (
    <>
      <ContactCover />
      <div className="container">
        <div
          className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center shadow"
          style={{
            marginTop: "-100px",
            backdropFilter: "blur(20px)",
            borderRadius: "15px",
            backgroundColor: "#ffffffa0",
          }}
        >
          <SideCover />
          <div className="col-12 col-lg-6 col-xl-7">
            <div className="justify-content-center">
              <div className="col-lg-12">
                <h2 className="fw-bold mb-5">Contact Us</h2>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Example1"
                          className="form-control"
                        />
                        <label
                          className="form-label"
                          htmlFor="form3Example1"
                          style={{ fontSize: "0.875rem", color: "#333" }}
                        >
                          Your name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="form3Example3"
                          className="form-control"
                        />
                        <label
                          className="form-label"
                          htmlFor="form3Example3"
                          style={{ fontSize: "0.875rem", color: "#333" }}
                        >
                          Email address
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <textarea
                      id="form3Example4"
                      className="form-control"
                      rows="4"
                    ></textarea>
                    <label
                      className="form-label"
                      htmlFor="form3Example4"
                      style={{ fontSize: "0.875rem", color: "#333" }}
                    >
                      Your message
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Submit
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

export default Contact;
