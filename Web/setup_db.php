<?php
$host = 'localhost';
$user = 'root';
$pass = 'Asdqwe123'; // User provided root password

try {
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS sigpau_db");
    $pdo->exec("USE sigpau_db");

    // Create user
    $pdo->exec("CREATE USER IF NOT EXISTS 'sigpau_user'@'localhost' IDENTIFIED BY 'Asdqwe123@'");
    $pdo->exec("GRANT ALL PRIVILEGES ON sigpau_db.* TO 'sigpau_user'@'localhost'");
    $pdo->exec("FLUSH PRIVILEGES");

    // Create tables
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    // Insert users if not exists
    $users = [
        ['Pau', 'Asdqwe123'],
        ['Eric', 'Asdqwe123'],
        ['Lautaro', 'Asdqwe123']
    ];

    $stmt = $pdo->prepare("INSERT IGNORE INTO users (username, password) VALUES (?, ?)");
    foreach ($users as $u) {
        $stmt->execute([$u[0], password_hash($u[1], PASSWORD_DEFAULT)]);
    }

    echo "Database setup completed successfully!";
} catch (PDOException $e) {
    die("Error setting up database: " . $e->getMessage());
}
?>
