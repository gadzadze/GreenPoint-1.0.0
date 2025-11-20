// Placeholder for your dynamic map loading function (loadApprovedChargers)
function loadApprovedChargers(data = []) {
    // Your Leaflet map initialization logic goes here.
    // When your back-end is ready, the fetch() API call will load data
    // into this function to display markers and update the count.

    var count = data.length;
    document.getElementById('chargerCountDisplay').textContent = `${count} chargers found`;

    // Example: Initial Map Setup (replace with your full logic later)
    var map = L.map('mapid').setView([41.7151, 44.8271], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

    // You would normally call loadApprovedChargers() after map initialization
}

// Initialize the front-end display (even with no data yet)
loadApprovedChargers([]);