var geo = {
    apiUrl: `https://api.opencagedata.com/geocode/v1/json?`,
    api: undefined,
    pos: undefined,
    apiKey: "69ae4737763149a18be447eb47817ad8",
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function () {

    },
    setApi: function (api) {
        this.api = api;
    },
    getLocation: function () {
        return (async () => {
            let pos = await getPosition();
            let lat = pos.coords.latitude
            let long = pos.coords.longitude
            if (!this.api || !pos || !this.apiKey) {
                alert("Couldn't fetch location")
                console.log(`Api: ${!!this.api} \n`,
                    `Position: ${!!pos}\n`,
                    `ApiKey: ${this.apiKey}\n`);
                return undefined;
            }
            let data = await this.api.fetchData(this.apiUrl + `q=${lat}+${long}&key=${this.apiKey}`)
            
            return data.results[0].components;
        })()
    },
}

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve(position)
        }, onError);
    })
}
function onSuccess(position) {

    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
        'Longitude: ' + position.coords.longitude + '<br />' +
        'Altitude: ' + position.coords.altitude + '<br />' +
        'Accuracy: ' + position.coords.accuracy + '<br />' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
        'Heading: ' + position.coords.heading + '<br />' +
        'Speed: ' + position.coords.speed + '<br />' +
        'Timestamp: ' + position.timestamp + '<br />';
}
function onError() {
    console.log("err");
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
