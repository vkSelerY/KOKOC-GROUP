const wrapper = document.querySelector(".wrapper")
const loginLink = document.querySelector(".login-link")
const registerLink = document.querySelector(".register-link")
const btnPopup = document.querySelector(".btnLogin-popup")
const CloseIcon = document.querySelector(".close-icon")
const Closehelper = document.querySelector(".closeMenu")
registerLink.addEventListener('click', ()=> {
  wrapper.classList.add('active')
});
loginLink.addEventListener('click', ()=> {
  wrapper.classList.remove('active')
});
btnPopup.addEventListener('click', ()=> {
  wrapper.classList.add('active-popup')
});
CloseIcon.addEventListener('click', ()=> {
  wrapper.classList.remove('active-popup')
});



document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('user_id');
    const username = localStorage.getItem('username');

    console.log("Чтение значений из localStorage:");
    console.log("user_id:", userId);
    console.log("username:", username);

    if (userId && username) {
        // Обновление кнопки на имя пользователя и добавление ссылки на личный кабинет
        const userDisplay = document.getElementById('user-display');
        userDisplay.innerHTML = `
            <span class="user-link">Welcome, ${username}</span>
            <button onclick="logout()" class="btnLogout">Logout</button>`;
    }

    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch('login.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log("Ответ сервера при входе:", data);
            if (data.status === 'success') {
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('username', data.username);

                // Обновляем отображение на главной странице без перехода на другую страницу
                const userDisplay = document.getElementById('user-display');
                userDisplay.innerHTML = `
                    <span class="user-link">Welcome, ${data.username}</span>
                    <button onclick="logout()" class="btnLogout">Logout</button>`;
            } else {
                document.getElementById('loginResponse').innerText = data.message;
            }
        })
        .catch(error => console.error('Ошибка при входе:', error));
    });

    document.getElementById('registrationForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch('register.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log("Ответ сервера при регистрации:", data);
            if (data.status === 'success') {
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('username', data.username);

                // Обновляем отображение на главной странице без перехода на другую страницу
                const userDisplay = document.getElementById('user-display');
                userDisplay.innerHTML = `
                    <span class="user-link">Welcome, ${data.username}</span>
                    <button onclick="logout()" class="btnLogout">Logout</button>`;
            } else {
                document.getElementById('registerResponse').innerText = data.message;
            }
        })
        .catch(error => console.error('Ошибка при регистрации:', error));
    });
});

function logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    location.reload();  // Обновление страницы после выхода
}
