import { createAndShowToast } from "../utils/toast.js";
import { buttonPulseRemove, buttonPulseActivate } from "../utils/btnPulse.js";
const body = document.querySelector('body');
const form = document.querySelector('#login_form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const btnSubmit = document.querySelector('#btn-sign-in');

form.addEventListener('change', async () => {
    if (emailInput.value && passwordInput.value) {
        btnSubmit.disabled = false;
    };
});

const URL = 'https://passportnodejs-auth.onrender.com/loginUser';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const credentials = {
        'email': emailInput.value,
        'pw': passwordInput.value
    };

    buttonPulseActivate(btnSubmit);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
    };

    try {
        const response = await fetch(URL, requestOptions);
        const data = await response.json();

        if (!response.ok) {
            return createAndShowToast(data.message, 'negative', body);  
        };

        createAndShowToast(data.message, 'positive', body);

        setTimeout(() => {
            window.location.replace('./pages/protected.html');
        }, 2500);

    } catch (error) {
        console.error("Error sending data:", error.message);

        const alert = 'Ops! Something went wrong. Try again later!';
        const objective = 'negative';
        createAndShowToast(alert, objective, body);
    } finally {
        buttonPulseRemove(btnSubmit);
    };

});
