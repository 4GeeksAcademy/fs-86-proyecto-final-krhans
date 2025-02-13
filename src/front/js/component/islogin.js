import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import {Loader} from "../component/loader.js";

const IsLogIn = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkProfile = async () => {
            if (profileExists()) {
                setIsLoading(false);
                return;
            }

            const token = localStorage.getItem("jwt-token");
            if (token) {
                const user = await get_user(token);
                if (!user || user.error) {
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }

            setIsLoading(false);
        };

        checkProfile();
    }, [navigate]);

    const get_user = async (token) => {
        return await actions.getUserData(token) || null;
    };

    const profileExists = () => {
        try {
            const user = store.userData;
            return user && user._user_name?.trim() ? user : false;
        } catch (error) {
            console.error("Error al comprobar el perfil:", error);
            return false;
        }
    };

    return isLoading ? <Loader /> : <Outlet />;
};

export default IsLogIn;