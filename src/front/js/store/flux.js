import { dispatcherUser } from "./dispatcher";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userName: "",
			email: "",
			phone: "",
			city:"",
			birthDate:"",
			password:"",
			
		},
		actions: {
			setUserName: (value) => {
                setStore({ userName: value });
            },
            setEmail: (value) => {
                setStore({ email: value });
            },
            setPhone: (value) => {
                setStore({ phone: value });
            },
            setCity: (value) => {
                setStore({ city: value });
            },
            setGender: (value) => {
                setStore({ gender: value });
            },
            setBirthDate: (value) => {
                setStore({ birthDate: value });
            },
            setPassword: (value) => {
                setStore({ password: value });
            },
            setConfirmPassword: (value) => {
                setStore({ confirmPassword: value });
            },
			addNewUser: async (navigate) => {
				const store = getStore();
				if (store.password !== store.confirmPassword) {
					alert("Las contraseñas no coinciden.");
					return;
				}
				const userData = {
					userName: store.userName,
					email: store.email,
					phone: store.phone,
					city: store.city,
					gender: store.gender,
					birthDate: store.birthDate,
					password: store.password
				};
				const newUser = await dispatcherUser.post(userData);
				if (newUser) {
					setStore({ ...store, newUser });
					alert("Registro exitoso!");
				}; 
				alert("Hubo un error al registrarse.");
				navigate('/login');			
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
