import { createAndShowToast } from "../utils/toast.js";
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

    addPulseBtnSubmit();

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    };

    try {
        const response = await fetch(URL, requestOptions);
        const data = await response.json();

        if (!response.ok) {
            return createAndShowToast(data.message, 'negative', body);  
        };

        const positiveMessage = response.json();
        const objective = 'positive';
        createAndShowToast(positiveMessage, objective, body);

        setTimeout(() => {
            window.location.replace('./pages/protected.html');
        }, 2500);

    } catch (error) {
        console.error("Error sending data:", error.message);

        const alert = 'Ops! Something went wrong. Try again later!';
        const objective = 'negative';
        createAndShowToast(alert, objective, body);
    } finally {
        removePulseBtnSubmit()
    };

});


function addPulseBtnSubmit() {
    btnSubmit.classList.add('animate-pulse');
};

function removePulseBtnSubmit() {
    btnSubmit.classList.remove('animate-pulse');
};

