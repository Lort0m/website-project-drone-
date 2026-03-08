<?php

include "config.php"; // Inclure le fichier de configuration pour la connexion à la base de données

// Requête SQl préparer "SELECT" * récupère tout les colone 
// ORDER BY date_reception DESC = on trie du plus récent au plus ancien
// LIMIT 1 = on limite le résultat à une seule ligne
$sql = "SELECT * FROM positions_drone ORDER BY date_reception DESC LIMIT 1";
// la variable $result stocke le résultat de la requête SQL
$result = $conn->query($sql);

// vérifaication si il y a une ligne 
if ($result->num_rows > 0) {
    // Récupération de la ligne de résultat
    $row = $result->fetch_assoc();
    // Affichage des positions récupérées
    echo "Position 1 : " . $row['pos1_latitude'] . ", " . $row['pos1_longitude'] . "<br>";
    echo "Position 2 : " . $row['pos2_latitude'] . ", " . $row['pos2_longitude'] . "<br>";
    // affichage si il y a pas de ligne trouvé 
} else {
    echo "⚠️ Aucune position trouvée dans la base.";
}

// fermer connection de donnée 
$conn->close();
?>