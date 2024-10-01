// TODO Filtrer les démarches affichées

// TODO Au CLICK SERVICE : afficher les ou la démarche à la manière de SP+

// BONUS : TODO CALL API SIRET > Nom d'établissement  
// https://staging.entreprise.api.gouv.fr/v3/insee/sirene/etablissements/diffusibles/79040830600062?context=test&object=test&recipient=10000001700010
// + token bearer
// ou API SPP


import './style.css'
import Papa from "papaparse";

const MAX_DISPLAY_SERVICES = 12;
var listDemarches = {};

// GET LIST OF ETABLISSEMENTS
var requestServices = "./public/hackathon-ds-service.csv";

async function getDataServices() {
  try {
    const response = await fetch(requestServices);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    // const json = await response.json();
    const json = await response.text();
    const services = Papa.parse(json).data;
    services.shift();
    displayServices(services);
  } catch (error) {
    console.error(error.message);
  }
}

getDataServices();

// GET LIST OF ETABLISSEMENTS
var requestDemarches = "./public/demarches.json";
var demarches = null;

async function getDataDemarches() {
  try {
    const response = await fetch(requestDemarches);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    demarches = json;
    // console.log(demarches);
  } catch (error) {
    console.error(error.message);
  }
}

getDataDemarches();

function onServiceDetail(e) {
  e.preventDefault();
  e.stopPropagation();

  var currentID = e.target.dataset.siret;
  // console.log( currentSIRET, e.target.dataset.siret );
  console.log( listDemarches[ currentID ] );

    // <button class="fr-btn fr-btn--sm fr-fi-checkbox-circle-line fr-btn--icon-left fr-btn--secondary">
    //   Label bouton SM
    // </button>

  // Filter demarche with ID
  /*
  var selectedDemarche = null;
  demarches.find( demarche => {
    if ( demarche.number == currentID ) selectedDemarche.push( demarche );
  } )
  console.log( selectedDemarche );
  */
}

function displayServices ( services ) {

  var listServices = "";
  var servicesSIRET = [];
  var index = 0;

  services.forEach( (service, i) => {

      if ( service[1] != '' ) {

        if ( servicesSIRET.indexOf( service[1] ) < 0 ) {

            if (index < MAX_DISPLAY_SERVICES) {
              listServices += '<div class="fr-col fr-col-md-3"><div class="fr-tile fr-tile--horizontal fr-enlarge-link tile-fiche-identite" data-siret="'+service[1]+'"><div class="fr-tile__body"><div class="fr-tile__content"><h3 class="fr-tile__title"><a href="#" data-fr-opened="false" aria-controls="fr-modal-fiche" data-siret="'+service[1]+'">SIRET : '+service[1]+'</a></h3><p class="fr-tile__detail"><span class="total-demarches"></span></p></div></div></div></div>';
            }

            servicesSIRET.push( service[1] );
            index++;
        }

        // STOCKAGE toutes les démarches pour 1 SIRET
        if ( listDemarches[service[1]] ) {
          listDemarches[ service[1] ].push( service );
        } else {
          listDemarches[ service[1] ] = [];
          listDemarches[ service[1] ].push( service );
        }
      }

  } );
  
  var listServicesDOM = document.querySelector('#list-services');
  listServicesDOM.innerHTML = listServices;
  listServicesDOM.querySelectorAll('a').forEach( link => link.addEventListener('click', onServiceDetail ) );

  // AFFICHE le nombre de démarches par SERVICE
  for (const [siret, list] of Object.entries(listDemarches)) {
    var currentTile = document.querySelector('.tile-fiche-identite[data-siret="'+siret+'"] .total-demarches');
    if (currentTile) currentTile.innerHTML = list.length + (list.length > 1 ? " démarches" : " démarche");
  }
}

// INIT MAP
var map = L.map('map').setView([48.847503475644594, 2.30621165836888], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
