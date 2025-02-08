import React from "react";
import "../../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import KHRANSPregunta from "../../img/KHRANSPregunta.jpg";
import BluePill from "../../img/blue-pill.gif";
import RedPill from "../../img/red-pill.gif";

const DashboardOverview = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-question">
        <h1>"Which path will you take?"</h1>
      </div>
      <div className="dashboard-avatar">
        <img
          src={KHRANSPregunta}
          alt="Khrans Avatar"
          className="khrans-dashboard"
        />
      </div>
      <div className="neblina"></div>
      <img
        src={BluePill}
        alt="Blue Pill"
        className="hand hand-left"
        onClick={() => navigate("/dashboard/fit-interview")}
      />
      <div className="pill-message pill-left">Coaching</div>
      <img
        src={RedPill}
        alt="Red Pill"
        className="hand hand-right"
        onClick={() => navigate("/dashboard/coaching-interview")}
      />
      <div className="pill-message pill-right">Training</div>
    </div>
  );
};


export default DashboardOverview;