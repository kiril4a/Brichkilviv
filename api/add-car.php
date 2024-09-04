<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();

if (!isset($_SESSION['loggedin']) || !$_SESSION['loggedin']) {
    http_response_code(403);
    echo json_encode(['error' => 'Неавторизований доступ']);
    exit();
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Підключення до бази даних
$host = '127.0.0.1';
$db = 'brichkilviv';
$user = 'brichkilviv'; 
$pass = 'MaxZminyParol11'; 

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Помилка підключення: " . $conn->connect_error);
}

// Обробка завантаження файлу
$targetDir = "../cars-photos/";
$fileName = '';
if (isset($_FILES['image']) && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
    $fileTmpName = $_FILES['image']['tmp_name'];
    $fileExt = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    
    // Генерація унікальної назви файлу
    $result = $conn->query("SELECT MAX(id) AS max_id FROM cars");
    if (!$result) {
        echo json_encode(['error' => 'Помилка запиту до бази даних']);
        exit();
    }
    
    $row = $result->fetch_assoc();
    $maxId = $row['max_id'] + 1;
    $fileName = "car" . $maxId . "." . $fileExt;
    $targetFile = $targetDir . $fileName;

    if (!move_uploaded_file($fileTmpName, $targetFile)) {
        echo json_encode(['error' => 'Помилка при завантаженні файлу']);
        exit();
    }
} else {
    echo json_encode(['error' => 'Файл не був завантажений або сталася помилка']);
    exit();
}

// Отримання даних з форми
$data = $_POST;
$image = $fileName;
$make = $data['make'];
$model = $data['model'];
$year = $data['year'];
$mileage = $data['mileage'];
$condition = $data['condition'];
$price = $data['price'];

// Перевірка на пусті значення
if (empty($condition)) {
    echo json_encode(['error' => 'Поле "Стан" не може бути порожнім']);
    exit();
}

// Додавання даних в базу
$sql = "INSERT INTO cars (image, make, model, year, mileage, car_condition, price) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['error' => 'Помилка підготовки запиту: ' . $conn->error]);
    exit();
}

$stmt->bind_param('sssiiss', $image, $make, $model, $year, $mileage, $condition, $price);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Не вдалося додати автомобіль: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
