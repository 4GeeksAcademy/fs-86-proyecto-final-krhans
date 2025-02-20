import React, {useState, useEffect} from "react";
import { dispatcherUser } from "../store/dispatcher.js";

const AvatarEmotions = ({onStatisticsClick, handleRedoInterview }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const videoId = "322634554020544";

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
    <div className="avatar-emotions">
      <div className="avatar-emotions__avatar">
        <video src={videoUrl} className="landing-avatar" autoPlay loop muted />
      </div>
    </div>
  );
};

export default AvatarEmotions;
