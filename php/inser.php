<?php
// connection base sql 
$conn = new mysqli("localhost", "root", "", "drone_tracking");

// préparation de la requette sql 
$sql = "INSERT INTO positions_drone (pos1_latitude, pos1_longitude, pos2_latitude, pos2_longitude)
        VALUES (48.8566140, 2.3522219, 48.8570000, 2.3530000)";

// envoie le requette sql 
$conn->query($sql);
// dire si c'est bon ou pas
echo "Position ajoutée";

$conn->close();
?>