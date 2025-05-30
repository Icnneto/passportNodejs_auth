import { createAndShowToast } from "./utils/toast.js";

export async function handleLogOut() {
    // addPulseBtnLogout()

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    };

    try {
        const response = await fetch('https://passportnodejs-auth.onrender.com/logoutUser', requestOptions);

        if (response.ok) {
            setTimeout(() => {
                window.location.replace('../index.html');
            }, 1500);
        };

    } catch (error) {
        console.error("Error logging out:", error.message);

        const alert = 'Ops! Something went wrong. Try again later!';
        const objective = 'negative';
        createAndShowToast(alert, objective, body);
    };
};