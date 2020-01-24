import React from "react";

import "./resume.css";

import NavBar from "../../components/navbar";

import ResumeHeader from "./resumeheader";
import { JS } from "./sections";

const Resume: React.FC = () => {
  return (
    <div className="resumeContainer">
      <NavBar />
      <ResumeHeader />
      <div className="resumeBody">
        <JS></JS>
      </div>
      <div className="viewPDF">View PDF</div>
    </div>
  );
};

export default Resume;
