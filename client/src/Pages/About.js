import React from "react";
import AboutSideCover from "../components/About/AboutSideCover/AboutSideCover";
import AboutCover from "../components/About/AboutCover/AboutCover";

function AboutUs() {
  return (
    <section>
      <AboutCover />
      <div className="container">
        <div
          className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center shadow"
          style={{
            marginTop: "-100px",
            backdropFilter: "blur(20px)",
            backgroundColor: "#ffffffa0",
            borderRadius: "15px",
          }}
        >
          <AboutSideCover />
          <div className="col-12 col-lg-6 col-xl-7">
            <div className="row justify-content-xl-center">
              <div className="col-12 col-xl-11">
                <h5
                  className="mb-4"
                  style={{ fontWeight: "normal", fontSize: "1.25rem" }}
                >
                  About Us
                </h5>
                <p
                  className="lead"
                  style={{
                    fontSize: "1rem",
                    color: "#333",
                    marginBottom: "1rem",
                  }}
                >
                  At Duty, we believe in empowering individuals through fashion.
                  Our collections are designed to celebrate uniqueness and
                  style.
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#555",
                    marginBottom: "2rem",
                  }}
                >
                  Our journey began with a vision to redefine fashion by making
                  it accessible and inclusive. We are dedicated to offering a
                  wide range of high-quality clothing that caters to diverse
                  tastes and preferences. Our commitment to sustainability and
                  ethical practices drives us to continually improve and
                  innovate.
                </p>
                <div className="row gy-4 gx-4">
                  <div className="col-12 col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="me-3 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-heart-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                      </div>
                      <div>
                        <h5
                          className="mb-2"
                          style={{ fontWeight: "normal", fontSize: "1rem" }}
                        >
                          Passionate Design
                        </h5>
                        <p style={{ fontSize: "0.875rem", color: "#555" }}>
                          Our designs are crafted with passion and attention to
                          detail, ensuring each piece reflects our love for
                          fashion.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="me-3 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-globe"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0 0 14A7 7 0 0 0 8 1zm0 1.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zM8 3a5 5 0 0 1 4.546 6.91c-.97-.37-2.235-1.247-3.5-2.75-1.265 1.503-2.53 2.38-3.5 2.75A5 5 0 0 1 8 3zm-4 6a4.978 4.978 0 0 1 1.82-3.731 6.12 6.12 0 0 0 2.18 2.755c.303-.325.59-.669.857-1.03A6.12 6.12 0 0 0 5.18 3.269 4.978 4.978 0 0 1 4 9zm8-6a4.978 4.978 0 0 1 1.82 3.731 6.12 6.12 0 0 0-2.18-2.755c-.303.325-.59.669-.857 1.03A6.12 6.12 0 0 0 10.82 9.73 4.978 4.978 0 0 1 12 3z" />
                        </svg>
                      </div>
                      <div>
                        <h5
                          className="mb-2"
                          style={{ fontWeight: "normal", fontSize: "1rem" }}
                        >
                          Global Inspiration
                        </h5>
                        <p style={{ fontSize: "0.875rem", color: "#555" }}>
                          Drawing inspiration from fashion capitals around the
                          world, our collections are a blend of global trends
                          and timeless elegance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#555",
                    marginTop: "2rem",
                  }}
                >
                  Join us on our journey to make fashion an expression of
                  individuality and a celebration of style. Explore our latest
                  collections and find pieces that resonate with your personal
                  style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
