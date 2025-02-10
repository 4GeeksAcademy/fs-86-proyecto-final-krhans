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
    upDate: async (token, updatedData, profileImage) => {
        try {
            const formData = new FormData();

            
            for (const key in updatedData) {
                formData.append(key, updatedData[key]);
            }

            
            if (profileImage) {
                formData.append("profile_image", profileImage);
            }

            const response = await fetch(`${process.env.BACKEND_URL}/api/user_profile`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                    // NO agregamos "Content-Type": "multipart/form-data" porque FormData lo maneja solo
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error Data:", errorData);
                throw new Error(`Error ${response.status}: ${errorData.error || response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error obteniendo los datos del usuario:", error);
            return { error: error.message };
        }
    }
    
};

