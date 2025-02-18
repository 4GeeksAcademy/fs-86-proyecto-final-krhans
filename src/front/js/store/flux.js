import { dispatcherUser } from "./dispatcher";
import UserData from "../clases/userdata";
import { Navigate } from "react-router-dom";

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
				routine: {
					name: "",
					description: "",
					days_per_week: "",
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
								user_image: data.user.user_image
							}
						});
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


			getTrainings:async()=>{
				const store=getStore();
				try {
					const token = localStorage.getItem("jwt-token");
					if (!token) throw new Error("No hay token disponible.");
					
					const workoutList = store.userData?.routines?.[0]?.workouts || []; 
					
					let trainingList = [];
					
					for (let i = 0; i < workoutList.length; i++) {
						if (workoutList[i].is_active) {
						   	trainingList.push(...workoutList[i].trainings); 
						  break;
						}
					  }
		
					return trainingList;
				} catch (error) {
					console.error("Error en la actualización:", error.message);
				}
			},
			getMessage: async () => {
				try {
					const token = localStorage.getItem("jwt-token");
					if (!token) throw new Error("No hay token disponible.");
					const response = await dispatcherUser.getRoutineList(token);
					if (!response || response.error) {
						throw new Error(response?.error || "No se pudo obtener la rutina.");
					}
					console.log("Datos que se reciben del back:", response[0].workout[0]);

					setStore({
						userData: {
							...store.userData,
							routine: response[0],
							workout: response[0].workout[0],
							trainings: response[0].workout[0].trainings || []
						}
					});
					// TODO:RETOCAR METODO
					return response;
				} catch (error) {
					console.error("Error al obtener la rutina:", error.message);
				}
			},


			getTrainings: async () => {
				const store = getStore();
				try {
					const token = localStorage.getItem("jwt-token");
					if (!token) throw new Error("No hay token disponible.");
					let workout_id;
					for (let i = 0; i < store.userData.workout.length; i++) {
						if (store.userData.workout[i].isActive) {
							workout_id = store.userData.workout[i].id;
							break; 
						}
					}
				console.log("funciona workout", workout_id);
				training_List = await dispatcherUser.getTrainings(token, workout_id)
				console.log("que me devuelve training list", training_List);
				return training_List || [];
			} catch(error) {
				console.error("Error al obtener los entrenamientos:", error.message);
				return null;
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



