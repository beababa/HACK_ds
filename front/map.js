import Papa from "papaparse";
import { aggregatGeoJSON, instructeursGeoJSON } from "./public/geojson.js"
import { usersGeoJSON  } from "./public/users.js"

// CENTRE DE LA FRANCE 46.76824775079769, 2.429963956344153 / ZOOM 6
// map : L.map('map').setView([46.76824775079769, 2.429963956344153], 6),
// BONDY 48.90084853876627, 2.5056758274769897 / ZOOM 12
// map : L.map('map').setView([48.90084853876627, 2.5056758274769897], 12),
// Romainville : 48.886340589950734, 2.4353482448798767
// map : L.map('map').setView([48.886340589950734, 2.4353482448798767], 12),

var SIRET_COORDINATES = {};

// INIT MAP
var map = {
    map : L.map('map').setView([48.886340589950734, 2.4353482448798767], 12),
    init : function () {

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        L.geoJSON(usersGeoJSON, {
            pointToLayer : function(geoJsonPoint, latlng) {
                var circleMarker = L.circleMarker(latlng, { radius : 2 });
                return circleMarker;
            }
        }).addTo(this.map);

        var aggregatCircles = [];
        L.geoJSON(aggregatGeoJSON, {
            pointToLayer : function(geoJsonPoint, latlng) {
                var circleMarker = L.circleMarker(latlng, { radius : geoJsonPoint.properties.nb * 2 });
                aggregatCircles.push( circleMarker );
                return circleMarker;
            }
        }).addTo(this.map);

        aggregatCircles.forEach( circleMarker => {
            circleMarker.setStyle({
                color: '#F00',
                fillOpacity: 0.5,
            });
        } );

        /*
        var circle = L.circle([51.508, -0.11], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 50
        }).addTo(this.map);
        */
    },

    /*
    getSIRET : async function ( departement, services ) {
        
        var self = this;

        try {
            console.log( "load start" );
            const response = await fetch("geo_siret_"+ departement +".csv");
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        
            const csvData = await response.text();

            // Stream big file in worker thread
            Papa.parse(csvData.data, {
                worker: true,
                step: function(results, index) {

                    var currentSiret = results.data[2];
                    var lat = results.data[54];
                    var lng = results.data[53];

                    if ( !SIRET_COORDINATES[currentSiret] ) {
                        SIRET_COORDINATES[currentSiret] = {
                            "longitude" : lng, 
                            "latitude" : lat
                        };
                    }

                    console.log( index );
                },
                complete: function() {
                    console.log("complete", SIRET_COORDINATES);
                }
            });

        } catch (error) {
            console.error(error.message);
        }
        
    },

    
    populateServices : function (services) {

        // getSIRET( "93", services );

        var index = 0;
        services.forEach( service => {

            var currentData = null;
            var currentSIRET = service[1];
            console.log( SIRET_COORDINATES, currentSIRET )
            if ( currentSIRET ) currentData = SIRET_COORDINATES[currentSIRET];

            console.log( currentData );
        } );

        
    }
    */
}


  window.addEventListener("SIRET_LOADED", e => {
    console.log( e, e.detail );
    // map.populateServices(services);
  }, false);

export default map;