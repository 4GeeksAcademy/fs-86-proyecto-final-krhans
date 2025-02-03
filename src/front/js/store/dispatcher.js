export const dispatcherUser = {
    post: async (userData) => {
        try {
            const response = await fetch("https://crispy-space-system-7vr5j99v9p6j2rr7j-3001.app.github.dev/api/sign_up", {
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
    }
};