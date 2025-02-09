import React, { useContext, useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Context } from "../store/appContext";
import EditProfile from "./userprofileModal";



const UserProfile = () => {
  const { store, actions } = useContext(Context);
  
 
  return (
    <div className="user-profile_container">
      <div className="user-profile card p-4 ">
        
        <header className="mb-4 text-center">
          <h2 className="mb-3 ">User Profile</h2>
          <img
            src="https://i.pinimg.com/236x/15/a1/5e/15a15ee5f2b88071ec438ea93857443b.jpg"
            alt="Foto de perfil"
            className="profile-image rounded-circle mb-3"
            
          />
        </header>

        
        <div className="user-details">
          <h2 className="mb-2"><strong>{store.userData.user_name || ''}</strong></h2>
          <p><strong>Age:</strong>{ store.userData.profile.age || ''}</p>
          <p><strong>Email:</strong> {store.userData.email || ''}</p>
          <p><strong>Phone:</strong> {store.userData.profile.phone_number || ''}</p>
          <p><strong>Gender:</strong> {store.userData.profile.gender || ''}</p>
          <p><strong>Description:</strong> {store.userData.profile.description || ''} </p>
        </div>


        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Edit Profile
        </button>
        <EditProfile />
      </div>
    </div>


  );
};

export default UserProfile;