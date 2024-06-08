import React from "react";
import ContactCover from "../components/ContactCover/ContactCover";
import SideCover from "../components/About/AboutSideCover/AboutSideCover";

function Contact() {
  return (
    <>
      <ContactCover />
      <div className="container">
        <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center shadow">
          <SideCover />
          <div className="col-12 col-lg-6 col-xl-7">
            <div className="justify-content-center">
              <div className="col-lg-8"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
