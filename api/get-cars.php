<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Дозволяє запити з будь-якого джерела
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Підключення до бази даних
$host = '127.0.0.1';
$db = 'brichkilviv';
$user = 'brichkilviv'; // замініть на вашого користувача бази даних
$pass = 'MaxZminyParol11'; // замініть на пароль до вашої бази даних

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Помилка підключення: " . $conn->connect_error);
}

// Отримання всіх автомобілів з бази даних
$sql = "SELECT id, image, make, model, year, mileage, car_condition, price FROM cars";
$result = $conn->query($sql);

$cars = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $cars[] = $row;
    }
}

echo json_encode($cars);

$conn->close();
?>
