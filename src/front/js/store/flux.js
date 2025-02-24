import { dispatcherUser } from "./dispatcher";
import UserData from "../clases/userdata";
import { Navigate } from "react-router-dom";
import { SoundCloudDispatcher } from "../store/SoundCloudDispatcher";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userData: {
				user_name: "",
				email: "",
				user_image: {},
				profile: {
					phone_number: "",
					age: "",
					gender: "",
					description: "",
					profile_image: "",
				},
				routines: {
					name: "",
					description: "",
					days_per_week: "",
					workouts: {
						fitness_level: "",
						category: "",
						goal: "",
						difficulty: "",
						is_active: "",
						trainings: {
							name: "",
							is_completed: "",
							mode: "",
							duration: "",
							repetitions: "",
							sets: "",
							rest: ""
						}
					}
				},

			},
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
				const store = getStore();
				try {
					const data = await dispatcherUser.login(email, password);
					if (data.token && typeof data.token === "string" && data.token.trim() !== "") {
						localStorage.removeItem("jwt-token");
						localStorage.setItem("jwt-token", data.token);
						setStore({
							userData: {
								...data.user,
								user_image: data.user.user_image,
								routines:data.routines
							}
						});
						console.log("Datos del usuario que se obtienen al loguearse: ",store.userData)
						return true;
					} else {
						throw new Error("Invalid credentials");
					}
				} catch (error) {
					console.error("Login failed:", error);
					throw error;
				}
			},
			routineExists:()=>{
				const store=getStore();
				try {
					console.log("Vamos a ver si hay rutinas en el usuario: ",store.userData)
				} catch (error) {
					console.error("Login failed:", error);
					throw error;
				}
			},
			getUserData: async (token) => {
				const store = getStore();
				try {
					if (!token) {
						throw new Error("Token de autenticación no proporcionado.");
					}
					const user = await dispatcherUser.getUserData(token);
					if (!user) {
						throw new Error("No se encontraron datos del usuario.");
					}
					setStore({ userData: user });
					return user;
				} catch (error) {
					console.error("Error al obtener los datos del usuario:", error.message);
					return { error: error.message };
				}
			},
			updateUser: async (user) => {
				try {
					const token = localStorage.getItem("jwt-token");
					if (!token) throw new Error("No hay token disponible.");
					const updatedUser = await dispatcherUser.update(token, user);
					if (!updatedUser || updatedUser.error) {
						throw new Error(updatedUser?.error || "No se pudo actualizar el usuario.");
					}
					setStore({ userData: updatedUser });
					return updatedUser;
				} catch (error) {
					console.error("Error en la actualización:", error.message);
					alert("Hubo un error al actualizar el usuario: " + error.message);
					return null;
				}
			},
			updateUserImage: async (newImage) => {
				const store = getStore();
				try {
					const token = localStorage.getItem("jwt-token");
					if (!token) throw new Error("No hay token disponible.");
					const updateImage = await dispatcherUser.updateImage(token, newImage);
					if (!updateImage || updateImage.error) {
						throw new Error(updateImage?.error || "No se pudo actualizar la imagen del usuario.");
					}
					setStore((prevStore) => ({
						...prevStore,
						userData: { ...prevStore.userData, user_image: updateImage.user_image }
					}));
					return updateImage;
				} catch (error) {
					console.error("Error en la actualización:", error.message);
					alert("Hubo un error al actualizar la imagen del usuario: " + error.message);
					return null;
				}
			},
			logout: async (navigate) => {
				try {
					const token = localStorage.getItem("jwt-token");
					if (!token) throw new Error("No hay token disponible.");
					const newState = await dispatcherUser.isActive(token);
					if (!newState || newState.error) {
						throw new Error(newState?.error || "No se pudo actualizar el estado del usuario.");
					}
					navigate("/");
					localStorage.removeItem("jwt-token");
					setStore({ userData: null });
				} catch (error) {
					console.error("Error en la actualización:", error.message);
					alert("Hubo un error al actualizar el estado del usuario: " + error.message);
					return null;
				}
			},
			getSoundCloudAccessToken: async () => {
				try {
					const token = await SoundCloudDispatcher.getAccessToken();
					return token
				} catch (error) {
					console.error("Error al obtener el token de SoundCloud:", error.message);
					return null; 
				}
			},
			
			getSoundCloudTracksByGenre: async (genre) => {
				try {
					const tracks = await SoundCloudDispatcher.getTracksByGenre(genre);
					return tracks;
				} catch (error) {
					console.error("Error al obtener los tracks de SoundCloud:", error.message);
					return null; 
				}
			},
			routineExists:()=>{
				const store=getStore();
				try {
					const exist=Array.isArray(store.userData.routines) && store.userData.routines.length > 0;
					console.log("Tiene rutinas: ",exist)
					return exist
				} catch (error) {
					console.error("Error al obtener los datos del usuario:", error.message);
					return null; 
				}
			},
			workoutExists: () => {
				const store = getStore();
				try {
					const hasWorkouts = Array.isArray(store.userData.routines) &&
						store.userData.routines.some(routine => 
							Array.isArray(routine.workouts) && routine.workouts.length > 0
						);
			
					console.log("Tiene workouts:", hasWorkouts);
					return hasWorkouts;
				} catch (error) {
					console.error("Error al verificar los workouts:", error.message);
					return false;
				}
			},			
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
		}
	};
};

export default getState;



