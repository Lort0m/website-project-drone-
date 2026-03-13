-- Script SQL pour créer la table SQL sur XAMPP et ect
CREATE TABLE positions_drone (
    id INT AUTO_INCREMENT PRIMARY KEY,
    position1 VARCHAR(100),
    position2 VARCHAR(100),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    date_reception DATETIME DEFAULT CURRENT_TIMESTAMP
);