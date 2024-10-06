<?php
session_start();

// Проверка, авторизован ли пользователь
if (!isset($_SESSION['user_id'])) {
    header('Location: login.html'); // Если не авторизован, перенаправляем на страницу входа
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Личный кабинет</title>
</head>
<body>
    <h1>Добро пожаловать, <?php echo $_SESSION['username']; ?>!</h1>
    <p>Это ваш личный кабинет.</p>
    <p><a href="logout.php">Выйти</a></p>
</body>
</html>
