import { createAndShowToast } from "../utils/toast.js";
import { buttonPulseRemove, buttonPulseActivate } from "../utils/btnPulse.js";
const body = document.querySelector('body');
const form = document.querySelector('#register_form');
const usernameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const toggleInput = documento.querySelector('#isTeacher');
const passwordInput = document.querySelector('#password');
const btnRegister = document.querySelector('#btn-register');

form.addEventListener('change', async () => {
    if (usernameInput.value && emailInput.value && passwordInput.value) {
        btnRegister.disabled = false;
    };
});

const URL = 'https://passportnodejs-auth.onrender.com/registerUser';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const credentials = {
        'uname': usernameInput.value,
        'email': emailInput.value,
        'isTeacher': toggleInput.value,
        'pw': passwordInput.value
    };

    buttonPulseActivate(btnRegister);

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
            window.location.replace('../index.html');
        }, 2500);

    } catch (error) {
        console.error("Error sending data:", error.message);

        const alert = 'Ops! Something went wrong. Try again later!';
        const objective = 'negative';
        createAndShowToast(alert, objective, body);
    } finally {
        buttonPulseRemove(btnRegister);
    };

});
