import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faCakeCandles, faPhone, faPerson, faComment, faImage } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";
import UserData from "../clases/userdata";
import "../../styles/userprofileModal.css"
import { Loader } from "./loader";

const EditProfile = () => {
    const {store,actions} = useContext(Context);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userGender, setUserGender] = useState('');
    const [profileImage, setProfileImage] = useState(); 
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setUserName(store.userData.user_name || '');
        setUserEmail(store.userData.email || '');
        setUserPhone(store.userData.profile.phone_number || '');
        setUserAge(store.userData.profile.age || '');
        setUserDescription(store.userData.profile.description || '');
        setUserGender(store.userData.profile.gender || '');
        setProfileImage(store.userData.profile.user_img || '')
    }, []);

    const actualizarUsuario = async () => {
        setLoading(true); 
    
        let newUser = new UserData();
        newUser.user_name = userName;
        newUser.email = userEmail;
        let profile = {
            age: userAge,
            phone_number: userPhone,
            gender: userGender,
            description: userDescription
        };
        newUser.profile = profile;

        const startTime = Date.now();
    
        try {
            await actions.upDateUser(newUser);
            console.log("Usuario actualizado con éxito");

            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(3000 - elapsedTime, 0); 

            setTimeout(() => {
               
                document.getElementById("exampleModal").classList.remove("show");
                document.body.classList.remove("modal-open"); 
                document.querySelector(".modal-backdrop").remove();

                setLoading(false); 
            }, remainingTime);
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="exampleModalLabel">Edit Profile</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div className="text-center mb-3">
                            <img
                                src={profileImage}
                                alt={userName}
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
                            <label className="modal_label" htmlFor="userName"> <FontAwesomeIcon icon={faUser} /> Username</label>
                            <input className="modal_input" type="text" id="userName" name="userName" required value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="modal_input-group d-flex flex-column">
                            <label className="modal_label" htmlFor="email"> <FontAwesomeIcon icon={faEnvelope} /> Email</label>
                            <input className="modal_input" type="text" id="email" name="email" required value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                        </div>
                        <div className="modal_input-group d-flex flex-column">
                            <label className="modal_label" htmlFor="age"> <FontAwesomeIcon icon={faCakeCandles} /> Age</label>
                            <input className="modal_input" type="text" id="age" name="age" required value={userAge} onChange={(e) => setUserAge(e.target.value)} />
                        </div>
                        <div className="modal_input-group d-flex flex-column">
                            <label className="modal_label" htmlFor="phone"> <FontAwesomeIcon icon={faPhone} /> Phone</label>
                            <input className="modal_input" type="text" id="phone" name="phone" required value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
                        </div>
                        <div className="modal_input-group d-flex flex-column">
                            <label className="modal_label" htmlFor="gender"> <FontAwesomeIcon icon={faPerson} /> Gender</label>
                            <input className="modal_input" type="text" id="gender" name="gender" required value={userGender} onChange={(e) => setUserGender(e.target.value)} />
                        </div>
                        <div className="modal_input-group d-flex flex-column">
                            <label className="modal_label" htmlFor="description"> <FontAwesomeIcon icon={faComment} /> Description</label>
                            <input className="modal_input" type="text" id="description" name="description" required value={userDescription} onChange={(e) => setUserDescription(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="button-modal_save"
                            onClick={actualizarUsuario} 
                            disabled={loading}                                         
                        >
                           { loading ? <Loader/> : "Save changes" }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;