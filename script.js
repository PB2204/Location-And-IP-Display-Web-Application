// This function is to fetch the latitude and longitude of the user

document.getElementById("fetchLocationBtn").addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById("latitude").textContent = latitude;
            document.getElementById("longitude").textContent = longitude;
            document.getElementById("ipv4AddressInfo").style.display = "none"; // Hide IPv4 address info
            document.getElementById("locationInfo").style.display = "block"; // Show location info
        }, error => {
            console.error('Error getting location:', error.message);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
});


// This function is to fetch the latitude and longitude of the user
// and the IPv4 address of the user using WebRTC

document.getElementById("fetchBothBtn").addEventListener("click", () => {
    if ("geolocation" in navigator) {
        // Add a unique query parameter to the geolocation API request
        const geoOptions = {
            timeout: 10000, // Set a timeout value in milliseconds
            maximumAge: 0, // Ensure that cached data is not used
            enableHighAccuracy: true // Request high accuracy for location data
        };

        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById("latitude").textContent = latitude;
            document.getElementById("longitude").textContent = longitude;
            document.getElementById("locationInfo").style.display = "block"; // Show location info

            // WebRTC to get IPv4 address
            const pc = new RTCPeerConnection();
            pc.createDataChannel("");
            pc.createOffer().then(function (offer) {
                pc.setLocalDescription(offer);
            });

            pc.onicecandidate = function (event) {
                if (event.candidate && event.candidate.candidate.includes("typ host")) {
                    const ipv4Address = event.candidate.candidate.split(" ")[4];
                    document.getElementById("ipv4Address").textContent = ipv4Address;
                    document.getElementById("ipv4AddressInfo").style.display = "block"; // Show IPv4 address info
                }
            };
        }, error => {
            console.error('Error getting location:', error.message);
        }, geoOptions);
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
});


document.getElementById("clearLocationBtn").addEventListener("click", () => {
    document.getElementById("latitude").textContent = "";
    document.getElementById("longitude").textContent = "";
    document.getElementById("ipv4Address").textContent = "";
    document.getElementById("ipv4AddressInfo").style.display = "none";
    document.getElementById("locationInfo").style.display = "none";
});