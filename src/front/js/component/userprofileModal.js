import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faCakeCandles, faPhone, faPerson, faComment, faImage } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";
import UserData from "../clases/userdata";
import { useNavigate } from "react-router-dom"; // Para la navegación
import "../../styles/userprofileModal.css";

const EditProfile = ({ showModal, onClose }) => {
  const { store, actions } = useContext(Context);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userGender, setUserGender] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; 

    if (isMounted) {
      setUserName(store.userData.user_name || '');
      setUserEmail(store.userData.email || '');
      setUserPhone(store.userData.profile.phone_number || '');
      setUserAge(store.userData.profile.age || '');
      setUserDescription(store.userData.profile.description || '');
      setUserGender(store.userData.profile.gender || '');
      setProfileImage(null);
      setPreviewImage(store.userData.profile.profile_picture || '');
    }

    return () => {
      isMounted = false; 
    };
  }, [store.userData]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
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
    let profile = {
      age: userAge,
      phone_number: userPhone,
      gender: userGender,
      description: userDescription,
    };
    newUser.profile = profile;

    try {
      await actions.updateUser(newUser);

      if (profileImage instanceof File) {
        const formData = new FormData();
        formData.append("image", profileImage);
        await actions.updateImagenProfile(formData);
      }

      await actions.getUserData(token); 

      setTimeout(() => {
        setLoading(false);
        onClose(); 
      }, 1000);
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
            <h5 className="modal-title text-center" id="exampleModalLabel">Edit Profile</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="text-center mb-3">
              <img
                src={previewImage}
                alt={store.userData.user_name}
                className="rounded-circle"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="mt-2">
                <label className="button-modal_image btn btn-outline">
                  <FontAwesomeIcon icon={faImage} /> Change image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            </div>

            <div className="modal_input-group d-flex flex-column">
              <label className="modal_label" htmlFor="userName"><FontAwesomeIcon icon={faUser} /> Username</label>
              <input className="modal_input" type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>

            <div className="modal_input-group d-flex flex-column">
              <label className="modal_label" htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /> Email</label>
              <input className="modal_input" type="text" id="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            </div>

            <div className="modal_input-group d-flex flex-column">
              <label className="modal_label" htmlFor="age"><FontAwesomeIcon icon={faCakeCandles} /> Age</label>
              <input className="modal_input" type="text" id="age" value={userAge} onChange={(e) => setUserAge(e.target.value)} />
            </div>

            <div className="modal_input-group d-flex flex-column">
              <label className="modal_label" htmlFor="phone"><FontAwesomeIcon icon={faPhone} /> Phone</label>
              <input className="modal_input" type="text" id="phone" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
            </div>

            <div className="modal_input-group d-flex flex-column">
              <label className="modal_label" htmlFor="gender"><FontAwesomeIcon icon={faPerson} /> Gender</label>
              <input className="modal_input" type="text" id="gender" value={userGender} onChange={(e) => setUserGender(e.target.value)} />
            </div>

            <div className="modal_input-group d-flex flex-column">
              <label className="modal_label" htmlFor="description"><FontAwesomeIcon icon={faComment} /> Description</label>
              <input className="modal_input" type="text" id="description" value={userDescription} onChange={(e) => setUserDescription(e.target.value)} />
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
