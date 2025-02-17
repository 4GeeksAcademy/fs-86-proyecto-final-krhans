export const dispatcherUser = {
    post: async (userData) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/sign_up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.error || response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error registrando usuario:", error);
            return { error: error.message };
        }
    },
    login: async (email, password) => {
        try {

            const response = await fetch(`${process.env.BACKEND_URL}/api/log_in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.error || response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            return { error: error.message };
        }
    },
    getUserData: async (token) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user_profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error Data:', errorData);
                throw new Error(`Error ${response.status}: ${errorData.error || response.statusText}`);
            }

            return await response.json();

        } catch (error) {
            console.error("Error obteniendo los datos del usuario:", error);
            return { error: error.message };
        }
    },
    update: async (token, updateData) => {
        try {
            
            const response = await fetch(`${process.env.BACKEND_URL}/api/user_profile`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                
                throw new Error(`Error ${response.status}: ${errorData.error || response.statusText}`);
            }
            const responseData = await response.json();
            
            return responseData;

        } catch (error) {
            
            return { error: error.message };
        }
    },
    updateImage: async (token, newImage) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user_profile/image`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    image_url: newImage  
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.error || response.statusText}`);
            }
    
            const responseData = await response.json();
            return responseData;
    
        } catch (error) {
            return { error: error.message };
        }
    },    

    isActive: async (token) => {
        try {
            
            const response = await fetch(`${process.env.BACKEND_URL}/api/logout`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" 
                },
               
            });
            console.log("Respuesta de la API (cruda):", response);
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error Data:", errorData);
                throw new Error(`Error ${response.status}: ${errorData.error || response.statusText}`);
            }
            const responseData = await response.json();
            console.log("Respuesta de la API:", responseData);
            return responseData;

        } catch (error) {
            console.error("Error obteniendo los datos del usuario:", error);
            return { error: error.message };
        }
    },
    postRoutine: async (token, routine) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/routine`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(routine)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.error || response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error registrando usuario:", error);
            return { error: error.message };
        }
    },
    getRoutineList: async (token) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/routine`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                   
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error Data:', errorData);
                throw new Error(`Error ${response.status}: ${errorData.error || response.statusText}`);
            }

            return await response.json();

        } catch (error) {
            console.error("Error obteniendo los datos del usuario:", error);
            return { error: error.message };
        }
    },

    getRoutineById: async (token, id) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/routine/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,          
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error Data:', errorData);
                throw new Error(`Error ${response.status}: ${errorData.error || response.statusText}`);
            }

            return await response.json();

        } catch (error) {
            console.error("Error obteniendo los datos del usuario:", error);
            return { error: error.message };
        }
    },
    
};

