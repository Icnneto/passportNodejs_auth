function createAndShowToast(message, objective, body) {
    let messageToUser = message;

    const addToast = document.createElement('div');
    addToast.classList.add(
        'toast',
        'toast-top',
        'toast-center'
    );

    if (objective === 'positive') {
        addToast.innerHTML = `
            <div class="alert font-main text-yellow border-yellow bg-background">
                <span>${messageToUser}</span>
            </div>
        `
    };

    if (objective === 'negative') {
        addToast.innerHTML = `
            <div class="alert font-main text-red-600 border-red-600 bg-background">
            <span>${messageToUser}</span>
        </div>
        `
    };

    if (objective === 'alert') {
        addToast.innerHTML = `
            <div class="alert font-main text-paragraph border-orange bg-background">
            <span>${messageToUser}</span>
        </div>
        `
    };

    body.append(addToast);

    setTimeout(() => {
        addToast.remove();
    }, 2000);
};

export { createAndShowToast };