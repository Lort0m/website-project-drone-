      function geocoder() {
      // récupère la valeurs saisie de imput c'est à dire "recherche de adresse ui"
      const adresse = document.getElementById("adresse").value;
      // récupère la div où le résultat sera affiché 
      const resultDiv = document.getElementById("result");

      // vérifie si urlilisateur met une adresse 
      if (!adresse) {
        alert("Veuillez entrer une adresse");
        return;
      }

      // Appel à l'API Nominatim
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(adresse)}`)
          // tranformatio nréponse htts en .json
        .then(response => response.json())
        // récupération de la donnée
        .then(data => {
          // vérifie si les résultat si il est là 
          if (data && data.length > 0) {
            // recupération latitude  
            const lat = data[0].lat;
            // recupération longitude
            const lon = data[0].lon;
            // nom complet adresse 
            const display = data[0].display_name;
            // affiche le résultat
            resultDiv.innerHTML = `
              <strong>Adresse :</strong> ${display} <br>
              <strong>Latitude :</strong> ${lat} <br>
              <strong>Longitude :</strong> ${lon}
            `;
            // il permet de le rende visible
            resultDiv.style.display = "block";
            // sinon réponde aucun résultat
          } else {
            resultDiv.innerHTML = "Adresse non trouvée.";
            resultDiv.style.display = "block";
          }
        })
        // débugage 
        .catch(err => {
          resultDiv.innerHTML = "Erreur : " + err.message;
          resultDiv.style.display = "block";
        });
}
