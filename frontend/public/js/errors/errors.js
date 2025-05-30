const forms = document.querySelectorAll('[required]');

const typesOfErrors = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
];

const messages = {
    uname: {
        valueMissing: "Ops! We need your name!",
        patternMismatch: "Please, insert a valid name.",
        tooShort: "Please, insert a valid name."
    },
    email: {
        valueMissing: "Ops! We need your e-mail!",
        typeMismatch: "Please, insert a valid e-mail.",
        tooShort: "Please, insert a valid e-mail"
    }
};

forms.forEach(field => {
    field.addEventListener('blur', () => fieldCheck(field));
    field.addEventListener('invalid', event => event.preventDefault());
});

function fieldCheck(field) {
    let message = '';
    field.setCustomValidity('');

    typesOfErrors.forEach(e => {
        if(field.validity[e]){
            message = messages[field.name][e]
        };
    });

    const errorMessage = field.parentNode.querySelector('.error-message')
    const inputValidator = field.checkValidity();

    if(!inputValidator){
        errorMessage.textContent = message
    } else {
        errorMessage.textContent = '';
    }
};
