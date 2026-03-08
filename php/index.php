<!DOCTYPE html>
<html>
<head>
    <title>Test PHP</title>
</head>
<body>

<h1>Test PHP</h1>


<div>
    <?php include "get_position.php"; ?> // inclusion du fichier get_position.php pour afficher la position actuelle du drone
</div>


// Formulaire pour modifier les positions du drone
<form action="update_position.php" method="POST">

    <label>ID de la ligne à modifier :</label><br>

    <label>Position 1 - Latitude :</label><br>
    <input type="text" name="pos1_lat" required><br><br>

    <label>Position 1 - Longitude :</label><br>
    <input type="text" name="pos1_lng" required><br><br>

    <label>Position 2 - Latitude :</label><br>
    <input type="text" name="pos2_lat" required><br><br>

    <label>Position 2 - Longitude :</label><br>
    <input type="text" name="pos2_lng" required><br><br>

    <button type="submit">Modifier</button>

</form>


</body>
</html>