<?php
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

// Отримання ID автомобіля з POST
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

// Видалення запису з бази даних
$sql = "SELECT image FROM cars WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();
$car = $result->fetch_assoc();

if ($car) {
    $image = $car['image'];
    $targetFile = "../cars-photos/" . $image;

    if (file_exists($targetFile)) {
        unlink($targetFile);
    }

    $stmt->close();

    $sql = "DELETE FROM cars WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Не вдалося видалити автомобіль: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Автомобіль не знайдено']);
}

$conn->close();
?>
