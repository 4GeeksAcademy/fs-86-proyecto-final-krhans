import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faCakeCandles, faPhone, faPerson, faComment, faImage } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";

const EditProfile = () => {
    const {store,actions} = useContext(Context);
    const [userName, setUserName] = useState(store.userData.user_name);
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userGender, setUserGender] = useState('');
    const [profileImage, setProfileImage] = useState(); 

    
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
                                alt="Foto de perfil"
                                className="rounded-circle"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                            <div className="mt-2">
                                <label className="btn btn-outline-secondary">
                                    <FontAwesomeIcon icon={faImage} /> Cambiar Imagen
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
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => actions.upDateUser()}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;