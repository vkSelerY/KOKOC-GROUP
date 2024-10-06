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

$nickname = $_POST['Nickname'] ?? '';
$email = $_POST['RegEmail'] ?? '';
$password = $_POST['RegPassword'] ?? '';

if (empty($nickname) || empty($email) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'Все поля должны быть заполнены']);
    exit;
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (nickname, email, password) VALUES ('$nickname', '$email', '$hashed_password')";
if ($conn->query($sql) === TRUE) {
    $user_id = $conn->insert_id;
    $_SESSION['user_id'] = $user_id;
    $_SESSION['username'] = $nickname;

    echo json_encode([
        'status' => 'success',
        'message' => 'Регистрация прошла успешно!',
        'user_id' => $user_id,
        'username' => $nickname,
        'redirect' => 'cabinet.html'
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $conn->error]);
}

$conn->close();
?>
