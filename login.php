<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=UTF-8');
session_start();

$servername = 'sql107.infinityfree.com';
$username = 'if0_37452426';
$password = 'oRYQGKwjpbE';
$database = 'if0_37452426_kokocgroup';

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка соединения: ' . $conn->connect_error]);
    exit;
}

$email = $_POST['Email'] ?? '';
$password = $_POST['Password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'Все поля должны быть заполнены']);
    exit;
}

$stmt = $conn->prepare("SELECT id, nickname, email, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['nickname'];

        echo json_encode([
            'status' => 'success',
            'message' => 'Авторизация прошла успешно!',
            'user_id' => $user['id'],
            'username' => $user['nickname'],
            'redirect' => 'cabinet.html'
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Неверный пароль. Попробуйте снова.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Пользователь с таким email не найден.']);
}

$stmt->close();
$conn->close();
?>
