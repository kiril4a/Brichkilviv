<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Дозволяє запити з інших доменів (CORS)

// Налаштування з'єднання з базою даних
$host = '127.0.0.1';
$db = 'brichkilviv';
$user = 'brichkilviv'; // замініть на вашого користувача бази даних
$pass = 'MaxZminyParol11'; // замініть на пароль до вашої бази даних

try {
    // Підключення до бази даних
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Виконання SQL-запиту для отримання автомобілів
    $stmt = $pdo->query("SELECT * FROM cars");
    $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Відправка результату у форматі JSON
    echo json_encode($cars);

} catch (PDOException $e) {
    // Виведення помилки у разі невдачі
    echo json_encode(['error' => 'Помилка підключення до бази даних: ' . $e->getMessage()]);
}
?>
