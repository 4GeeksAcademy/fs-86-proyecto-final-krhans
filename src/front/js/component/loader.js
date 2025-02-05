import React from "react";
import "../../styles/loader.css";
import KhransAvatar from "../../img/KHRANS.gif";

export const Loader = () => {
    return(
       <div className = "loader-container">
        <img src = {KhransAvatar} alt = "loader Avatar" className = "loader-avatar"/>
        <span>Loading...</span>
       </div>
    );
};