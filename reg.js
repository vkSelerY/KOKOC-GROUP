// reg.js

// Регистрация пользователя
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Отключаем стандартное поведение формы

    // Получение данных формы
    const formData = new FormData(this); // Создаем объект FormData на основе формы

    // Отправка запроса на сервер
    fetch('register.php', {
        method: 'POST', // Метод POST
        body: formData, // Передаем данные формы в запрос
    })
    .then(response => response.text()) // Используем response.text(), чтобы получить текст ответа
    .then(text => {
        // Логируем необработанный ответ от сервера для отладки
        console.log("Raw response text from server:", text);

        try {
            // Пытаемся разобрать ответ как JSON
            const data = JSON.parse(text);
            console.log("Parsed JSON data:", data); // Логируем распарсенный JSON

            // Отображаем сообщение с результатом на странице
            document.getElementById('registerResponse').innerHTML = data.message;

            // Если регистрация успешна, перенаправляем на другую страницу
            if (data.status === 'success') {
                setTimeout(() => {
                    window.location.href = data.redirect; // Переход на страницу, указанную в 'redirect'
                }, 2000);
            }
        } catch (error) {
            // Если возникает ошибка при разборе JSON
            console.error('Ошибка разбора JSON:', error, 'Ответ от сервера:', text);
            document.getElementById('registerResponse').innerHTML = 'Ошибка на сервере. Проверьте корректность ответа сервера.';
        }
    })
    .catch(error => {
        // Логируем любые ошибки при выполнении запроса
        console.error('Ошибка:', error);
        document.getElementById('registerResponse').innerHTML = 'Ошибка сети или соединения. Попробуйте снова позже.';
    });
});
