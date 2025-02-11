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
            console.log(response);
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

            const response = await fetch(`https://refactored-space-waffle-x594gqgpg4gj3pgjq-3001.app.github.dev/api/log_in`, {
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
    upDate: async (token, updateData) => {
        try {
            console.log("datos enviados al backend", updateData);
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
    }

};

