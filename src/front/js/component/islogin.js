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
               const userProfile = profileExists();
   
               if (userProfile) {
                   setIsLoading(false); 
               } else {
                   const token = localStorage.getItem("jwt-token");
                   if (token) {
                       const user = await get_user(token);
                       if (!user) {
                           navigate("/login");
                       }
                       setIsLoading(false);
                   } else {
                       setIsLoading(false); 
                       navigate("/login");
                      
                   }
               }
           };
   
           checkProfile();
       }, [store, actions, navigate]);
   
       const get_user = async (token) => {
           return await actions.getUserData(token) || null;
       };
   
       const profileExists = () => {
           try {
               const user = store.userData;
   
               if (user && user._user_name?.trim()) {
                   return user; 
               }
   
               return false; 
           } catch (error) {
               console.error("Error al comprobar el perfil:", error);
               return false;
           }
       };
   
       
       if (isLoading) {
           return <Loader />;
       }
   
       return store.userData ? <Outlet /> : null;
};

export default IsLogIn;