<?php
// definition des paramètres de connexion à la base de données avec des variablmes
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "drone_tracking";3

// connection base de donnée 
$conn = new mysqli($servername, $username, $password, $dbname);

// vérification de la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>