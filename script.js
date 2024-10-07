document.addEventListener('DOMContentLoaded', function () {
    // Код для работы с формами регистрации и входа
    const wrapper = document.querySelector(".wrapper");
    const wrapper1 = document.querySelector(".wrapper1")
    const loginLink = document.querySelector(".login-link");
    const registerLink = document.querySelector(".register-link");
    const btnPopup = document.querySelector(".btnLogin-popup");
    const CloseIcon = document.querySelector(".close-icon");
    const Closehelper = document.querySelector(".closeMenu");

    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active');
    });

    registerLink.addEventListener('click', () => {
        wrapper1.classList.add('active');
    });

    loginLink.addEventListener('click', () => {
        wrapper1.classList.remove('active');
    });

    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
    });

    CloseIcon.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
    });

    btnPopup.addEventListener('click', () => {
        wrapper1.classList.add('active-popup');
    });

    CloseIcon.addEventListener('click', () => {
        wrapper1.classList.remove('active-popup');
    });

    // Логика для авторизации, регистрации и управления сессией
    const userId = localStorage.getItem('user_id');
    const username = localStorage.getItem('username');

    if (userId && username) {
        const userDisplay = document.getElementById('user-display');
        userDisplay.innerHTML = `
            <a href="cabinet.html" class="user-link">Welcome, ${username}</a>
            <button onclick="logout()" class="btnLogout">Logout</button>`;
    }

    // Переход на страницу "Состав"
    // const teamLink = document.getElementById('team-link');
    // if (teamLink) {
    //     teamLink.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         window.location.href = 'team.html';
    //     });
    // }

    // // Логика возврата на главную страницу при нажатии на логотип
    // const logotype = document.getElementById('logotype');
    // if (logotype) {
    //     logotype.addEventListener('click', function () {
    //         window.location.href = 'index.html';
    //     });
    // }

    document.getElementById('loginForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch('login.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('username', data.username);

                const userDisplay = document.getElementById('user-display');
                userDisplay.innerHTML = `
                    <a href="cabinet.html" class="user-link">Welcome, ${data.username}</a>
                    <button onclick="logout()" class="btnLogout">Logout</button>`;

                document.getElementById('loginResponse').innerText = "Добро пожаловать, " + data.username;
            } else {
                document.getElementById('loginResponse').innerText = data.message;
            }
        })
        .catch(error => console.error('Ошибка при входе:', error));
    });

    document.getElementById('registrationForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch('register.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('username', data.username);

                const userDisplay = document.getElementById('user-display');
                userDisplay.innerHTML = `
                    <a href="cabinet.html" class="user-link">Welcome, ${data.username}</a>
                    <button onclick="logout()" class="btnLogout">Logout</button>`;

                document.getElementById('registerResponse').innerText = "Добро пожаловать, " + data.username;
            } else {
                document.getElementById('registerResponse').innerText = data.message;
            }
        })
        .catch(error => console.error('Ошибка при регистрации:', error));
    });
});

// Функция для выхода из аккаунта
function logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    location.reload();
}
