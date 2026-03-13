

// ========== VARIABLES ==========
// Variables de la carte
let map;
let userMarker = null;
let customMarker = null;
let selectedLatLng = null;
let buildingsLayer = null;

// Éléments DOM
const statusEl = document.getElementById('status');
const lancerBtn = document.getElementById('lancerBtn');
const resultEl = document.getElementById('result');

// Coordonnées par défaut
const DEFAULT_LAT = 44.37414973944449;
const DEFAULT_LNG = 4.644867956060432;

// Icônes
const blueIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41]
});

const redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41]
});

// ========== FONCTIONS ==========
function loadBuildings() {
    if (buildingsLayer) map.removeLayer(buildingsLayer);

    const bounds = map.getBounds();
    const query = `[out:json];(way["building"](${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}););out geom;`;
    const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);

    fetch(url)
        .then(r => r.json())
        .then(data => {
            const features = data.elements
                .filter(e => e.type === "way" && e.geometry && e.geometry.length > 2)
                .map(e => {
                    const coords = e.geometry.map(pt => [pt.lat, pt.lon]);
                    if (coords[0][0] !== coords[coords.length-1][0] || coords[0][1] !== coords[coords.length-1][1]) {
                        coords.push(coords[0]);
                    }
                    return {
                        type: "Feature",
                        properties: { tags: e.tags || {} },
                        geometry: { type: "Polygon", coordinates: [coords] }
                    };
                });

            buildingsLayer = L.geoJSON(features, {
                style: { color: 'red', weight: 1, fillColor: 'red', fillOpacity: 0.4 },
                onEachFeature: (f, layer) => {
                    let popup = '<b>Bâtiment</b>';
                    if (f.properties.tags.building) popup += `<br>Type : ${f.properties.tags.building}`;
                    layer.bindPopup(popup);
                }
            }).addTo(map);
        })
        .catch(err => console.error("Erreur bâtiments:", err));
}

function initMap(lat, lng) {
    map = L.map('map').setView([lat, lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    userMarker = L.marker([lat, lng], { icon: blueIcon })
        .addTo(map)
        .bindPopup('Vous êtes ici')
        .openPopup();

    map.on('click', e => {
        selectedLatLng = e.latlng;
        
        if (customMarker) {
            customMarker.setLatLng(selectedLatLng);
        } else {
            customMarker = L.marker(selectedLatLng, { icon: redIcon }).addTo(map);
        }

        const distance = userMarker.getLatLng().distanceTo(selectedLatLng);
        const popup = `Point choisi<br>Lat: ${selectedLatLng.lat.toFixed(6)}<br>Lng: ${selectedLatLng.lng.toFixed(6)}<br>Distance: ${(distance/1000).toFixed(2)} km`;
        customMarker.bindPopup(popup).openPopup();

        lancerBtn.disabled = false;
        statusEl.textContent = "Point placé ! Tu peux cliquer sur Lancer";
    });

    setTimeout(loadBuildings, 500);
    map.on('moveend', () => {
        if (map.getZoom() >= 14) {
            loadBuildings();
        } else if (buildingsLayer) {
            map.removeLayer(buildingsLayer);
            buildingsLayer = null;
        }
    });

    statusEl.textContent = "Clique sur la carte pour placer ton point";
}

// ========== INITIALISATION ==========
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        pos => initMap(pos.coords.latitude, pos.coords.longitude),
        err => {
            console.warn("Géolocalisation refusée", err);
            statusEl.textContent = "Géolocalisation refusée, carte centrée sur BSA";
            initMap(DEFAULT_LAT, DEFAULT_LNG);
        }
    );
} else {
    statusEl.textContent = "Géolocalisation non supportée";
    initMap(DEFAULT_LAT, DEFAULT_LNG);
}

// ========== BOUTON LANCER ==========
lancerBtn.addEventListener('click', () => {
    if (!selectedLatLng) {
        alert("Tu n'as pas encore placé de point !");
        return;
    }

    // VARIABLES DISPONIBLES :
    const latitude = selectedLatLng.lat;
    const longitude = selectedLatLng.lng;
    const userLat = userMarker.getLatLng().lat;
    const userLng = userMarker.getLatLng().lng;
    const distance = userMarker.getLatLng().distanceTo(selectedLatLng) / 1000; // en km

    console.log("=== VARIABLES DISPONIBLES ===");
    console.log("Point sélectionné - Latitude:", latitude);
    console.log("Point sélectionné - Longitude:", longitude);
    console.log("Position utilisateur - Latitude:", userLat);
    console.log("Position utilisateur - Longitude:", userLng);
    console.log("Distance (km):", distance.toFixed(2));

    resultEl.innerHTML = `<strong>Coordonnées enregistrées :</strong><br>
        Latitude: ${latitude.toFixed(6)}<br>
        Longitude: ${longitude.toFixed(6)}<br>
        Distance: ${distance.toFixed(2)} km`;

    statusEl.textContent = 'Coordonnées affichées !';
});
