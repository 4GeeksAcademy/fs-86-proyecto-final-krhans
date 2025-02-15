import React from "react";

const AvatarEmotions = ({ avatarSrc, onStatisticsClick }) => {
  return (
    <div className="avatar-emotions">
      <div className="avatar-emotions__avatar">
        <img
          src={avatarSrc}
          alt="Avatar"
          className="avatar-image"
          onClick={onStatisticsClick}
        />
      </div>
      <div className="avatar-emotions__statistics">
        <button className="statistics-button" onClick={onStatisticsClick}>
          STATISTICS
        </button>
      </div>
    </div>
  );
};

export default AvatarEmotions;
