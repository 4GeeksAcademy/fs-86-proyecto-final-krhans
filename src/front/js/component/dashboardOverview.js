import React, {useState, useEffect} from "react";
import "../../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { dispatcherUser } from "../store/dispatcher.js";
import BluePill from "../../img/blue-pill.gif";
import RedPill from "../../img/red-pill.gif";

const DashboardOverview = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const navigate = useNavigate();

  const videoId = "322981315347904";

  useEffect(() => {
          const fetchVideo = async () => {
              const result = await dispatcherUser.fetchVideoUrl(videoId);
              if (result.url) {
                  setVideoUrl(result.url);
              }
          };
  
          fetchVideo();
      }, [videoId]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-question">
        <h1>"Which path will you take?"</h1>
      </div>
      <div className="dashboard-avatar">
        <video src={videoUrl} className="khransDashboard-video" autoPlay loop muted />
      </div>
      <div className="neblina"></div>
      <img
        src={BluePill}
        alt="Blue Pill"
        className="hand hand-left"
        onClick={() => navigate("/dashboard/fit-interview")}
      />
      <div className="pill-message pill-left">Training</div>
      <img
        src={RedPill}
        alt="Red Pill"
        className="hand hand-right"
        onClick={() => navigate("/dashboard/coaching-interview")}
      />
      <div className="pill-message pill-right">Coaching</div>
      <Outlet/>
    </div>
  );
};


export default DashboardOverview;