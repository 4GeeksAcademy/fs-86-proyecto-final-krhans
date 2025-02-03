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
					const response = await dispatcherUser.post(user);
						console.log(response)
					if (response && response.ok) { 
						const newUser = await response.json();
						setStore({ userData: newUser });
						alert("Registro exitoso!");
					} else {
						throw new Error("No se pudo registrar el usuario.");
					}
				} catch (error) {
					console.error("Error en el registro:", error);
					alert("Hubo un error al registrarse.");
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
