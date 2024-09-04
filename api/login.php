<?php
session_start();

// Ваші дані для авторизації
$valid_username = "admin";
$valid_password = "admin"; // Зберігайте пароль у зашифрованому вигляді в реальному застосунку

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($username === $valid_username && $password === $valid_password) {
        $_SESSION['loggedin'] = true;
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
