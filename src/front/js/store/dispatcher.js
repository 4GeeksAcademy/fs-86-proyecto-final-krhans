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
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("error registering user:", error);
        }
    }
};