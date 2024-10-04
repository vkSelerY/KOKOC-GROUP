<?php
header('Content-Type: application/json'); // Устанавливаем заголовок для JSON

// Включаем вывод ошибок для отладки (только на этапе разработки)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Подключение к базе данных
$conn = new mysqli('localhost', 'root', '', 'registration_system');

// Проверка подключения
if ($conn->connect_error) {
    // Если произошла ошибка подключения, возвращаем её в JSON формате
    echo json_encode(['status' => 'error', 'message' => 'Ошибка подключения: ' . $conn->connect_error]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Получаем данные из формы
    $nickname = $conn->real_escape_string($_POST['nickname']);
    $regemail = $conn->real_escape_string($_POST['regemail']);
    $regpassword = password_hash($_POST['regpassword'], PASSWORD_DEFAULT); // Хешируем пароль

    // Проверка уникальности email
    $checkEmail = $conn->query("SELECT id FROM users WHERE email='$regemail'");
    if ($checkEmail->num_rows > 0) {
        // Если email уже зарегистрирован, возвращаем ошибку
        echo json_encode(['status' => 'error', 'message' => 'Этот email уже зарегистрирован.']);
    } else {
        // Вставляем данные нового пользователя в базу данных
        $sql = "INSERT INTO users (username, email, password) VALUES ('$nickname', '$regemail', '$regpassword')";
        if ($conn->query($sql) === TRUE) {
            // Возвращаем успешный ответ, если регистрация прошла успешно
            echo json_encode(['status' => 'success', 'message' => 'Регистрация прошла успешно!']);
        } else {
            // Если произошла ошибка при вставке данных в базу
            echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $conn->error]);
        }
    }
}

$conn->close();
?>
