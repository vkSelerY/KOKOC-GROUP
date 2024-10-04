$(document).ready(function () {
    $('#registrationForm').on('submit', function (e) {
        e.preventDefault(); // Предотвращаем стандартное поведение формы

        var formData = {
            nickname: $('#nickname').val(),
            regemail: $('#regemail').val(),
            regpassword: $('#regpassword').val()
        };

        // AJAX-запрос на сервер
        $.ajax({
            url: 'register.php', // Путь к PHP-файлу
            type: 'POST',
            data: formData,
            success: function (response) {
                console.log("Ответ от сервера:", response); // Проверка ответа от сервера
                // Преобразуем строку ответа в объект JSON
                var jsonResponse = JSON.parse(response);

                if (jsonResponse.status === 'success') {
                    // Успешная регистрация
                    $('#registerResponse').html('<p style="color: green;">' + jsonResponse.message + '</p>');
                } else {
                    // Ошибка (например, email уже используется)
                    $('#registerResponse').html('<p style="color: red;">' + jsonResponse.message + '</p>');
                }
            },
            error: function (xhr, status, error) {
                // Выводим сообщение об ошибке, если запрос не удался
                $('#registerResponse').html('<p style="color: red;">Произошла ошибка. Попробуйте снова.</p>');
            }
        });
    });
});
