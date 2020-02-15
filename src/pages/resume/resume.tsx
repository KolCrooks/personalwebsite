import React from "react";

import "./resume.css";

import NavBar from "../../components/navbar";

import ResumeHeader from "./resumeheader";
import { JSHeader } from "./sections";

const Resume: React.FC = () => {
  return (
    <div className="resumeContainer">
      <NavBar />
      <ResumeHeader />
      <div className="resumeBody">
        <JSHeader></JSHeader>
      </div>
      <div className="viewPDF">View PDF</div>
    </div>
  );
};

export default Resume;
