import React from "react";
import ProjectCard from "../ProjectCard/ProjectCard.jsx";
import { useHistory } from "react-router-dom";
import Button from "../Button/Button";
import "./Landing.css";

const Landing = () => {
  const history = useHistory();
  const redirectTo = (path) => {
    history.push(path);
  };

  return (
    <div className="landing-wrapper">
      <div className="landing-container">
        <div className="landing-body">
          <div className="landing-upper-area">
            <p className="landing-header">ML Tools Overview</p>
          </div>
          <div className="landing-divider"></div>
          <div className="landing-lower-area">
            <div className="project-container">
              <ProjectCard
                projectName={"ML Interface Wizard"}
                description={
                  "An application that generates input forms for any machine learning model."
                }
                imagePath={
                  "https://cdn.dribbble.com/users/331265/screenshots/5415177/1015-abtestinguxcomponent-luke_dribbble.png"
                }
              />
              <Button
                type="submit"
                onClick={() => {
                  redirectTo("/interface-wizard");
                  window.scrollTo(0, 0);
                }}
                buttonType="success"
                text="Go to the Project 🚀"
              />
            </div>
            <div className="project-container">
              <ProjectCard
                projectName={"ML Measure"}
                description={"ML measure project description."}
                imagePath={""}
              />
              <Button
                type="submit"
                onClick={() => {
                  redirectTo("/measure");
                  window.scrollTo(0, 0);
                }}
                buttonType="success"
                text="Go to the Project 🚀"
              />
            </div>
            <div className="project-container">
              <ProjectCard
                projectName={"ML Contribute"}
                description={"Label your data, train a dataset, merge and repeat!"}
                imagePath={"https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/264849394/original/0c4b44fb721f7eae23c545da07e31c64892eff6e/make-different-deep-learning-logo-for-your-company.jpg"}
              />
              <Button
                type="submit"
                onClick={() => {
                  redirectTo("/contribute");
                  window.scrollTo(0, 0);
                }}
                buttonType="success"
                text="Go to the Project 🚀"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
