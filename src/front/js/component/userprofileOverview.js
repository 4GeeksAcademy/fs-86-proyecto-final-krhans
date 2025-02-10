import React, { useContext, useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Context } from "../store/appContext";
import EditProfile from "./userprofileModal";
import "../../styles/userprofileOverview.css"


const UserProfile = () => {
  const { store, actions } = useContext(Context);
  
 
  return (
    <div className="user-profile_container ">
      <div className="user-profile_card ">
        
        <header className="user-profile_title">
          <h1 className="mb-3 ">{store.userData.user_name || ''}</h1>
          <img
            src="https://i.pinimg.com/236x/15/a1/5e/15a15ee5f2b88071ec438ea93857443b.jpg"
            alt={store.userData.user_name || ''}
            className="user-profile_image"
            
          />
        </header>

        
        <div className="user-profile_details">
          <p><strong>Age:</strong>{ store.userData.profile.age || ''}</p>
          <p><strong>Email:</strong> {store.userData.email || ''}</p>
          <p><strong>Phone:</strong> {store.userData.profile.phone_number || ''}</p>
          <p><strong>Gender:</strong> {store.userData.profile.gender || ''}</p>
          <p><strong>Description:</strong> {store.userData.profile.description || ''} </p>
        </div>


        <button type="button" className="user-profile_button" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Edit Profile
        </button>
        <EditProfile />
      </div>
    </div>


  );
};

export default UserProfile;