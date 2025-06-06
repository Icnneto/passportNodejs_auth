import { createAndShowToast } from "./utils/toast.js";
import { handleLogOut } from "./logout.js";
import { buttonPulseActivate, buttonPulseRemove } from "./utils/btnPulse.js";
const main = document.querySelector('main');
const body = document.querySelector('body');

window.addEventListener('DOMContentLoaded', async () => {

    try {
        const response = await fetch('https://passportnodejs-auth.onrender.com/profile', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            createAndShowToast(data.message || 'Unauthorized', 'negative', body);
            setTimeout(() => {
                window.location.replace('../index.html');
            }, 1500);
        }

        createInterface(main, data.user);

    } catch (error) {
        console.error('Erro at authorization', error);
        createAndShowToast(error, 'negative', body);
        setTimeout(() => {
            window.location.replace('../index.html');
        }, 3000);
    }
});

function createInterface(element, user) {
    const section = document.querySelector('section');

    section.innerHTML += `
        <h1 class="text-2xl text-title">You've made it to the protected route, ${user}</h1>
        <hr class="border border-yellow/30 w-1/2 ">
        <button id="logout"
            class="group flex items-center justify-start w-11 h-11 bg-yellow rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1">
            <div
                class="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <svg class="w-4 h-4" viewBox="0 0 512 512" fill="white">
                    <path
                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
                    </path>
                </svg>
            </div>
            <div
                class="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Logout
            </div>
        </button>
    `
    const logoutBtn = document.querySelector('#logout');
    logoutBtn.addEventListener('click', async () => {
        try {
            buttonPulseActivate(logoutBtn);
            await handleLogOut();
            buttonPulseRemove(logoutBtn);
        } catch (error) {
            createAndShowToast(error, 'negative', body);
        }        
    })

    element.appendChild(section);
};