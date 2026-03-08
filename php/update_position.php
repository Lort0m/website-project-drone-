<?php
include "config.php";

// Récupération des données envoyées par le formulaire
$id = 1; // ID de la ligne à modifier (ici, on suppose que c'est la ligne avec id=1)
$pos1_lat = $_POST['pos1_lat'];
$pos1_lng = $_POST['pos1_lng'];
$pos2_lat = $_POST['pos2_lat'];
$pos2_lng = $_POST['pos2_lng'];

// Requête SQL UPDATE
$sql = "UPDATE positions_drone
        SET pos1_latitude = $pos1_lat,
            pos1_longitude = $pos1_lng,
            pos2_latitude = $pos2_lat,
            pos2_longitude = $pos2_lng
        WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo "✔️ Position mise à jour";
} else {
    echo "❌ Erreur : " . $conn->error;
}

$conn->close();
?>