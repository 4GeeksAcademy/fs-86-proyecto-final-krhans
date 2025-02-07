import { dispatcherUser } from "./dispatcher";
import UserData from "../clases/userdata";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userData: new UserData()
		},
		actions: {
			addNewUser: async (user) => {
				try {
					const newUser = await dispatcherUser.post(user);
					if (!newUser || newUser.error) { 
						throw new Error(newUser?.error || "No se pudo registrar el usuario.");
					}			
					setStore({ userData: newUser });			
					return newUser;
				} catch (error) {
					console.error("Error en el registro:", error.message);
					alert("Hubo un error al registrarse: " + error.message);
				}
			},
			login: async (email, password) => {
				try {
					const token = await dispatcherUser.login(email, password);
			
					if (token && typeof token === "string" && token.trim() !== "") {
						localStorage.removeItem("jwt-token");
						
						localStorage.setItem("jwt-token", token);
						
						return true;
					} else {
						throw new Error("Invalid credentials");
					}
				} catch (error) {
					console.error("Login failed:", error);
					throw error; 
				}
			},			
			getUserData: async (token) => {
				try {
					if (!token) {
						throw new Error("Token de autenticación no proporcionado.");
					}

					const user = await dispatcherUser.getUserData(token);
			
					if (!user) {
						throw new Error("No se encontraron datos del usuario.");
					}
			
					return user;
			
				} catch (error) {
					console.error("Error al obtener los datos del usuario:", error.message);
					return { error: error.message };
				}
			},
			
				
			

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
		}
	};
};

export default getState;
