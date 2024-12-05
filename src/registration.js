const username = document.getElementById('username');
const password = document.getElementById('password');
const passwordRepeat = document.getElementById('passwordRepeat');
const errorMessage = document.getElementById('error_message');
const fraction = document.getElementById('select_fraction');

const checkUser = function() {
    if (localStorage.userDataLX === undefined) {
        return;
    }
    window.location.href = "game.html";
}

const register = function() {
    password.removeEventListener("input", function(){});
    passwordRepeat.removeEventListener("input", function(){});

    if (!checkUsername(username.value)) {
        username.addEventListener("input", function(){
            checkUsername(username.value);
        })
        return;
    }

    if (!checkPasswords(password.value, passwordRepeat.value)) {
        password.addEventListener("input", function() {
            checkPasswords(password.value, passwordRepeat.value);
        });
        passwordRepeat.addEventListener("input", function() {
            checkPasswords(password.value, passwordRepeat.value);
        });
        return;
    }

    localStorage.userDataLX = JSON.stringify({
        "name": username.value,
        "password": password.value,
        "fraction": fraction.value
    });

    window.location.href = "game.html";
}

const checkUsername = function(username) {
    if (username.length === 0) {
        errorMessage.innerHTML = "Введите имя персонажа!";
        return false;
    } else {
        return true;
    }
}

const checkPasswords = function(password, passwordRepeat) {
    if (password.length === 0 || passwordRepeat.length === 0) {
        errorMessage.innerHTML = "Один или оба пароля не введены!"
        return false;
    }
    if (password === passwordRepeat) {
        errorMessage.innerHTML = "";
        return true;
    } else {
        errorMessage.innerHTML = "Пароли не совпадают!";
        return false;
    }
}

checkUser();