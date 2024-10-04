<?php
header('Content-Type: application/json'); // Устанавливаем заголовок, чтобы возвращать JSON

// Включаем вывод ошибок для отладки (на этапе разработки)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Подключение к базе данных
$conn = new mysqli('localhost', 'root', '', 'registration_system');

// Проверка подключения
if ($conn->connect_error) {
    // Возвращаем ошибку подключения в формате JSON
    echo json_encode(['status' => 'error', 'message' => 'Ошибка подключения: ' . $conn->connect_error]);
    exit();
}

// Если данные отправлены через POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    // Проверка существования пользователя
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Проверка пароля
        if (password_verify($password, $user['password'])) {
            echo json_encode(['status' => 'success', 'message' => 'Вход выполнен успешно!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Неправильный пароль.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Неправильный логин.']);
    }
}

$conn->close();
?>
