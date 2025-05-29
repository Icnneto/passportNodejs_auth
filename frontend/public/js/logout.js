import { createAndShowToast } from "./utils/toast.js";
const btnLogout = document.querySelector('#logout');
const body = document.querySelector('body');

btnLogout.addEventListener('click', async (e) => {
    e.preventDefault();

    addPulseBtnLogout()

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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
    } finally {
        removePulseBtnLogout();
    }
});

function addPulseBtnLogout() {
    btnLogout.classList.add('animate-pulse');
};

function removePulseBtnLogout() {
    btnLogout.classList.remove('animate-pulse');
};