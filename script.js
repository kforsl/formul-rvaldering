'use strict';

window.addEventListener(`load`, () => {

    initPage()
});

function initPage() {
    const registerFormRef = document.querySelector(`#registerForm`);
    const contentContainerRef = document.querySelector(`#contentContainer`);
    const loginContainerRef = document.querySelector(`#loginForm`);
    registerFormRef.classList.add(`d-none`);
    contentContainerRef.classList.add(`d-none`)

    const buttonRef = document.querySelectorAll(`#loginForm button`);
    buttonRef.forEach(btn => {
        if (btn.textContent === `Logga in`) {
            btn.addEventListener(`click`, validateLogin)
        } else if (btn.textContent === `Registrera`) {
            btn.addEventListener(`click`, (event) => {
                event.preventDefault();
                registerFormRef.classList.remove(`d-none`);
                loginContainerRef.classList.add(`d-none`);
                const buttonRef = document.querySelector(`#registerForm button`);
                buttonRef.addEventListener(`click`, validateRegistration)
            })
        }
    })
}

function validateLogin() {
    event.preventDefault();
    const usernameInput = document.querySelector(`#username`);
    const passwordInput = document.querySelector(`#password`);
    const errorMsgRef = document.querySelector(`#errorMsg`);
    errorMsgRef.textContent = ``;

    try {
        const usernameMatch = users.filter(user =>
            user.username === usernameInput.value)
        if (usernameMatch.length === 0) {
            throw {
                node: usernameInput,
                msg: `Användaren finns inte`
            }
        } else {
            if (usernameMatch[0].password === passwordInput.value) {
                initContent()
            } else {
                throw {
                    node: passwordInput,
                    msg: `Fel lösenord`
                }
            }
        }

    } catch (error) {
        error.node.value = ``;
        error.node.focus();
        errorMsgRef.textContent = error.msg
    }
}

function validateRegistration() {
    event.preventDefault();
    const userName = document.querySelector(`#uName`);
    const password = document.querySelector(`#pWord`);
    const passwordAgain = document.querySelector(`#pWordAgain`);
    const errorMsgRef = document.querySelector(`#errorMsg`);
    errorMsgRef.textContent = ``;
    const flag = false;
    try {
        const usernameMatch = users.filter(user => user.username === userName.value)

        if (usernameMatch.length !== 0) {
            throw {
                node: username,
                msg: `Användaren finns redan`
            }
        } else {
            if (userName.value.length <= 6) {
                throw {
                    node: userName,
                    msg: `Användarnamn måste vara längre än 6 tecken`
                }
            } else {
                if (password.value.length <= 8) {
                    throw {
                        node: password,
                        msg: `Lösenordet måste vara 8 tecken eller längra`
                    }
                }
                else if (/[A-Z]/.test(password.value) !== true || /[a-z]/.test(password.value) !== true) {
                    throw {
                        node: password,
                        node2: passwordAgain,
                        msg: `Lösenordet måste innehålla stora och små tecken`
                    }
                }
                else if (/\d/.test(password.value) !== true) {
                    throw {
                        node: password,
                        node2: passwordAgain,
                        msg: `Lösenordet måste innehålla ett nummer`
                    }
                }
                else if (password.value !== passwordAgain.value) {
                    throw {
                        node: passwordAgain,
                        msg: `Lösenordet matchar inte `
                    }
                } else {
                    users.push({
                        username: userName.value,
                        password: passwordAgain.value
                    })
                    document.querySelector(`#username`).value = userName.value;
                    document.querySelector(`#password`).value = passwordAgain.value;
                    validateLogin()
                }

            }
        }

    } catch (error) {
        error.node.value = ``;
        error.node.focus();
        errorMsgRef.textContent = error.msg
    }



}

function initContent() {
    event.preventDefault();

    const loginContainerRef = document.querySelector(`#loginForm`);
    const registerFormRef = document.querySelector(`#registerForm`);
    const contentContainerRef = document.querySelector(`#contentContainer`);

    loginContainerRef.classList.add(`d-none`)
    contentContainerRef.classList.remove(`d-none`)
    registerFormRef.classList.add(`d-none`)
}

function logOut() {

}