import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import EditProfile from "./userprofileModal";
import "../../styles/userprofileOverview.css";

const UserProfile = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false); 


  const userImage = store.userData?.user_image?.img && store.userData.user_image.img !== ""
    ? store.userData.user_image.img
    : "https://i.pinimg.com/236x/af/3f/b8/af3fb80ea32ddfe2df0440b37f99514a.jpg";

  const handleEditProfileClick = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  useEffect(() => {
  
    const token = localStorage.getItem("jwt-token");
    if (token) {
      actions.getUserData(token); 
    }
  }, [store.userData?.user_image?.img, actions]);

  return (
    <div className="user-profile_container">
      <div className="user-profile_card">
        <header className="user-profile_title">
          <h1 className="mb-3">{store.userData?.user_name || ''}</h1>
          <img
            src={userImage}
            alt={store.userData?.user_name || ''}
            className="user-profile_image"
          />
        </header>
        <div className="user-profile_details">
          <p><strong>Age:</strong> {store.userData?.profile?.age || ''}</p>
          <p><strong>Email:</strong> {store.userData?.email || ''}</p>
          <p><strong>Phone:</strong> {store.userData?.profile?.phone_number || ''}</p>
          <p><strong>Gender:</strong> {store.userData?.profile?.gender || ''}</p>
          <p><strong>Description:</strong> {store.userData?.profile?.description || ''}</p>
        </div>
        <button type="button" className="user-profile_button" onClick={handleEditProfileClick}>
          Edit Profile
        </button>

        <EditProfile showModal={showModal} onClose={handleCloseModal} userImage={userImage}/>
      </div>
    </div>
  );
};

export default UserProfile;
