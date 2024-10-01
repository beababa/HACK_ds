
// INIT MAP
var map = {
    map : L.map('map').setView([46.76824775079769, 2.429963956344153], 6),
    init : function () {

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
    },
    populateServices : function (services) {

        var index = 0;
        services.forEach( service => {

            var currentAddress = service[2];
            if ( currentAddress && currentAddress != '') {
                if ( index < 50 ) getCoordinatesFromAddress( currentAddress );
                index++;
            }
        } );

        /*
        var circle = L.circle([51.508, -0.11], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 50
        }).addTo(this.map);
        */
    }
}

async function getCoordinatesFromAddress ( address ) {

    var requestURL = encodeURI("https://api-adresse.data.gouv.fr/search/?q=" + address);

    console.log( "getCoordinatesFromAddress", requestURL );

    /*
    try {
      const response = await fetch(requestURL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log( "result", json );
    //   const json = await response.text();
    //   const services = Papa.parse(json).data;
    //   services.shift();
    //   populateServices(services);
    //   map.populateServices(services);
    } catch (error) {
      console.error(error.message);
    }
    */
  }

export default map;