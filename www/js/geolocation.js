var geo = {
  apiUrl: `https://api.opencagedata.com/geocode/v1/json?`,
  api: undefined,
  apiKey: "69ae4737763149a18be447eb47817ad8",
  device: undefined,
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },

  onDeviceReady: function() {
    (async () => {
      var l = await geo.getLocationData();
      var { country_code, country, city } = l.components;
      var callingCode = l.annotations.callingcode;
      var { iso_code, name, symbol } = l.annotations.currency;
      var { lat, lng } = l.geometry;
      var element = document.getElementById("geolocation");
      console.log(l);
      element.innerHTML = `
      <div class="ma0 center-align">
        <img
            src="https://www.countryflags.io/${country_code}/shiny/64.png"
            class="h3 w3" alt="flag">
        <p class="ma0">
          ${city}, ${country}
        </p>
      <div class="divider mv4"></div>
      </div>
      <div class="mh2">
        <h5>More info:</h5>
        <div class="grey-text text-darken-3">
        <p class="ma0">
          <span class="black-text ">Country: </span>${country} (${country_code})
        </p>
        <p class="ma0">
          <span class="black-text ">City: </span>${city}
        </p>
        <p class="ma0">
          <span class="black-text ">Calling code: </span>${callingCode}
        </p>
        <p class="ma0">
          <span class="black-text ">Currency name: </span>${name} - ${symbol}
        </p>
        <p class="ma0">
          <span class="black-text ">Latitude: </span>${lat}, <span class="black-text ">Longitude: </span>${lng}
        </p>
        </div>
      </div>`;
    })();
  },
  setApi: function(api) {
    this.api = api;
  },
  getLocationData: function() {
    return (async () => {
      let pos,
        lat,
        long = undefined;
      if (device.platform !== "browser") {
        pos = await getPosition();
      } else {
        //set default Location if in browser (Dublin)
        pos = {
          coords: {
            latitude: 53.349804,
            longitude: -6.26031
          }
        };
      }
      lat = pos.coords.latitude;
      long = pos.coords.longitude;
      if (!this.api || !pos || !this.apiKey) {
        alert("Couldn't fetch location");
        console.log(
          `Api: ${!!this.api} \n`,
          `Position: ${!!pos}\n`,
          `ApiKey: ${this.apiKey}\n`
        );
        return undefined;
      }
      let url = this.apiUrl + `q=${lat}+${long}&key=${this.apiKey}`;
      console.log(url);
      let data = await this.api.fetchData(url);

      return data.results[0];
    })();
  }
};

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      resolve(position);
    }, onError);
  });
}
function onError(error) {
  alert("code: " + error.code + "\n" + " message: " + error.message + "\n");

  throw Error("Couldn't retrieve location");
}
