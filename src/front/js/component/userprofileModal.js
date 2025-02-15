import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faCakeCandles, faPhone, faPerson, faComment } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";
import UserData from "../clases/userdata";
import { useNavigate } from "react-router-dom";
import "../../styles/userprofileModal.css";
import UploadWidget from "./UploadWidget";

const EditProfile = ({ showModal, onClose }) => {
  const { store, actions } = useContext(Context);
  const [userName, setUserName] = useState(store.userData.user_name || "");
  const [userEmail, setUserEmail] = useState(store.userData.email || '');
  const [userPhone, setUserPhone] = useState(store.userData.profile?.phone_number || '');
  const [userAge, setUserAge] = useState(store.userData.profile?.age || '');
  const [userDescription, setUserDescription] = useState(store.userData.profile?.description || '');
  const [userGender, setUserGender] = useState(store.userData.profile?.gender || '');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(store.userData.user_image?.img || '');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));  
    }
  };

  const handleUploadSuccess = (imageUrl) => {
    setProfileImage(imageUrl);
    setPreviewImage(imageUrl);  
  };

  const actualizarUsuario = async () => {
    setLoading(true);
  
    const token = localStorage.getItem("jwt-token"); 
    if (!token) {
      console.error("Token de autenticación no proporcionado.");
      setLoading(false);
      return;
    }
  
    let newUser = new UserData();
    newUser.user_name = userName;
    newUser.email = userEmail;
    newUser.profile = {
      age: userAge,
      phone_number: userPhone,
      gender: userGender,
      description: userDescription,
    };
  
    try {
      await actions.updateUser(newUser);
      if (profileImage && profileImage !== store.userData.user_image?.img) {
        await actions.updateUserImage(profileImage); 
      }
      
       
      await actions.getUserData(token);
  
      setLoading(false);
  
      if (onClose) {
        onClose(); 
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setLoading(false);
    }
  };
  

  if (!showModal) return null;

  return (
    <div className="modal show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center">Edit Profile</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="text-center mb-3">
              <img
                src={previewImage || "https://via.placeholder.com/100"} 
                alt="Profile"
                className="rounded-circle"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="mt-2">
                {/* UploadWidget to handle image upload */}
                <UploadWidget onUploadSuccess={handleUploadSuccess} onChange={handleImageChange} />
              </div>
             
            </div>

            <div className="modal_input-group d-flex flex-column">
              <label className="modal_label"><FontAwesomeIcon icon={faUser} /> Username</label>
              <input className="modal_input" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>

            <div className="modal_input-group d-flex flex-column">
              <label className="modal_label"><FontAwesomeIcon icon={faEnvelope} /> Email</label>
              <input className="modal_input" type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            </div>

            <div className="modal_input-group d-flex flex-column">
              <label className="modal_label"><FontAwesomeIcon icon={faCakeCandles} /> Age</label>
              <input className="modal_input" type="text" value={userAge} onChange={(e) => setUserAge(e.target.value)} />
            </div>

            <div className="modal_input-group d-flex flex-column">
              <label className="modal_label"><FontAwesomeIcon icon={faPhone} /> Phone</label>
              <input className="modal_input" type="text" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
            </div>

            <div className="modal_input-group d-flex flex-column">
              <label className="modal_label"><FontAwesomeIcon icon={faPerson} /> Gender</label>
              <input className="modal_input" type="text" value={userGender} onChange={(e) => setUserGender(e.target.value)} />
            </div>

            <div className="modal_input-group d-flex flex-column">
              <label className="modal_label"><FontAwesomeIcon icon={faComment} /> Description</label>
              <input className="modal_input" type="text" value={userDescription} onChange={(e) => setUserDescription(e.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="button-modal_save" onClick={actualizarUsuario} disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
