import React, { useEffect, useReducer, useRef, useState } from "react";
import "react-typist/dist/Typist.css";
import "./Resume.scss";
import selfImage from "./selfImage.jpeg";
import bulletinLogo from "./bulletin_full_light.svg";
import ubcLogo from "./ubc-logo-1.png";

enum TABS {
  OVERVIEW,
  EXPERIENCE,
  EDUCATION,
}

function TabUnderline(props: { posElement: HTMLElement | null }) {
  const x = props.posElement?.offsetLeft || 0;
  const width = props.posElement?.offsetWidth || 0;

  return (
    <div
      className="tab-underline"
      style={{ "--width": width + "px", "--x": x + "px" } as any}
    ></div>
  );
}

function ResumeOverview() {
  const programmingLanguages = (
    <div className="langauges">
      <h3>Programming Languages:</h3>
      <h4>Proficient at:</h4>
      <ul>
        <li>Javascript/NodeJS/Typescript</li>
        <ul>
          <li>Extensive experience with React/Vue</li>
          <li>Experience with REST and GraphQL API usage and design</li>
        </ul>
        <li>Java</li>
        <li>
          C#
          <ul>
            <li>WPF and UWP GUI applications</li>
          </ul>
        </li>
      </ul>
      <h4>Knowledge of:</h4>
      C++, MATLAB, R, GO
    </div>
  );
  return (
    <div className="resume-overview">
      <div className="overview-left">
        <img src={selfImage} alt="Kol Crooks" className="portrait" />
        {programmingLanguages}
      </div>
      <div className="overview-middle">
        <h2 style={{ marginBottom: "0" }}>About me</h2>
        <div className="info">
          I am currently a student at the University of British Columbia and
          have a passion for many aspects of programming; from data science and
          machine learning, to web and server development. I am constantly
          seeking to expand my knowledge and become a better, more versatile
          programmer.
        </div>
        <div className="skills">
          <h2>Skills</h2>
          <h3>Problem Solving:</h3>
          My approach to problem solving is based on data analysis and
          identifying deeper causes of problems. I try to identify factors that
          others might not have thought of to find unique solutions to problems
          based on such factors as cost-benefit, strategy, social benefit, pain
          points or engagement.
          <h3>Adaptable:</h3>I have experience with changing project goals and
          will always revise previous work to meet the new criteria. I am also
          able to learn new programming languages as required by the task at
          hand.
          <h3>Leadership:</h3>
          At the company I co-founded, I led a team setting standards and goals
          for the project. Working with others and motivating team members to
          reach a common goal provided invaluable experience.
          <h3>Communication:</h3>
          As a team leader, I have ensured all members were kept up to date on
          the progress of the project. Working with clients, I have been
          responsible for communicating technical information to both IT
          personnel and administrators.
        </div>
      </div>
    </div>
  );
}
function ResumeExperience() {
  return (
    <div className="resume-experience">
      <div className="experience-col">
        <img src={bulletinLogo} alt="bulletin" className="bulletin-logo" />
        <div className="subText">Position: Co-Founder</div>
        <div className="subText">September 2017 - Present</div>
        <h3>What I did:</h3>
        <ul>
          <li>
            Created a web application to enable high school teachers to
            coordinate exam schedules for the benefit of the students. In this,
            I worked with the district and teachers to develop the student led
            change.
          </li>
          <li>
            Created a Vuejs based PWA for mobile platforms, gaining 745 unique
            devices (at a school of 900 students) in 2 months.
          </li>
        </ul>
        <h3>Experience gained:</h3>
        <ul>
          <li>Project management</li>
          <li>
            Designing and using coding standards that will remain relevant into
            the future
          </li>
          <li>Agile environment</li>
          <li>AWS and database/application security</li>
          <li>Experience in Market research</li>
        </ul>
      </div>
      <div className="experience-col">
        <h1>Yale University Biomedical Research Lab</h1>
        <div className="subText">Position: Software Developer Internship</div>
        <div className="subText">BioImage Suite Web Development Team</div>
        <div className="subText">Summers of 2018 and 2019</div>
        <h3>What I did:</h3>
        <ul>
          <li>
            Integrated a new volume rendering module into the code base that
            utilized an existing proprietary data format
          </li>
          <li>
            Created data visualization tools and data formats for looking CPM
            (connectome predictive modeling) outputs.
          </li>
        </ul>
        <h3>Experience gained:</h3>
        <ul>
          <li>Working as part of a team on a large project</li>
          <li>Creating rendering modules for data analysis</li>
          <li>Progressive web application (PWA) development</li>
          <li>Best practices for git</li>
          <li>Becoming oriented with an existing codebase</li>
        </ul>
      </div>
    </div>
  );
}
function ResumeEducation() {
  return (
    <div className="resume-education">
      <img src={ubcLogo} alt="UBC logo" className="ubc-logo" />
      <div>
        <b>GPA: </b> 3.77
        <h2>Relevant Courses:</h2>
      </div>
      <ul>
        <li>
          <b>CPSC 121 (A):</b> Time complexity, Boolean algebra, logic, proofs,
          structures of computation, and more.
        </li>
        <li>
          <b>DSCI 100 (TBD):</b> Tools to process, summarize, visualize, and
          analyze data.
        </li>
        <li>
          <b>CPSC 110 (TBD):</b> Base Programming course at my university
        </li>
        <li>
          <b>WRDS 150B (B+):</b> Communicating scientific knowledge to a lay
          audience and the dissemination of research into the public sphere.
        </li>
      </ul>
    </div>
  );
}

function TabsBar(props: { tab: TABS; tabClicked: (tab: TABS) => void }) {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const { tab } = props;
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const overviewRef = useRef(null);
  let el: HTMLElement | null = null;
  useEffect(() => {
    if (!el) forceUpdate();
  });

  switch (tab) {
    case TABS.EXPERIENCE:
      el = experienceRef.current;
      break;
    case TABS.EDUCATION:
      el = educationRef.current;
      break;
    case TABS.OVERVIEW:
    default:
      el = overviewRef.current;
  }

  return (
    <div className="resume-tabs">
      <span
        className={"overview" + (tab === TABS.OVERVIEW ? " active" : "")}
        ref={overviewRef}
        onClick={() => props.tabClicked(TABS.OVERVIEW)}
      >
        Overview
      </span>
      <span
        className={"experience" + (tab === TABS.EXPERIENCE ? " active" : "")}
        ref={experienceRef}
        onClick={() => props.tabClicked(TABS.EXPERIENCE)}
      >
        Experience
      </span>
      <span
        className={"education" + (tab === TABS.EDUCATION ? " active" : "")}
        ref={educationRef}
        onClick={() => props.tabClicked(TABS.EDUCATION)}
      >
        Education
      </span>
      <TabUnderline posElement={el} />
    </div>
  );
}

function Resume() {
  const [tab, setTab] = useState(TABS.OVERVIEW);
  let activeTab = <></>;
  switch (tab) {
    case TABS.EXPERIENCE:
      activeTab = <ResumeExperience />;
      break;
    case TABS.EDUCATION:
      activeTab = <ResumeEducation />;
      break;
    case TABS.OVERVIEW:
    default:
      activeTab = <ResumeOverview />;
  }
  return (
    <div className="Resume">
      <div className="resume-contents">
        <TabsBar tab={tab} tabClicked={(tab) => setTab(tab)} />
        {activeTab}
      </div>
    </div>
  );
}

export default Resume;
