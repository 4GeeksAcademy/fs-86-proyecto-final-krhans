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
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("error registering user:", error);
        }
    }
};