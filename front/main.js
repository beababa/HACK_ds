import './style.css'
import Papa from "papaparse";

// API INSEE
// const API_INSEE_HEADER = "X-INSEE-Api-Key-Integration";
// const API_INSEE_KEY = "XXX";
// const API_INSEE_URL_ENDPOINT = "https://api.insee.fr/api-sirene/3.11/siret/";

const API_SIRET = {
  "13000852700017" : {
    "name" : "DIRECTION DEPARTEMENTALE TERRITOIRES MARNE"
  },
  "13000856800060" : {
    "name" : "DIRECTION DEPARTEMENTALE DES TERRITOIRES ET DE LA MER HERAULT"
  },
  "21310113200016" : {
    "name" : "COMMUNE DE CASTANET TOLOSAN"
  },
  "78042897500020" : {
    "name" : "CAISSE D'ALLOCATIONS FAMILIALES DE LA MARNE"
  },
  "78644805000033" : {
    "name" : "CAF DE LA VENDEE"
  },
  "22530001100015" : {
    "name" : "DEPARTEMENT DE LA MAYENNE"
  },
  "53409249900068" : {
    "name" : "CAISSE D'ALLOCATIONS FAMILIALES DE SEINE-MARITIME"
  },
  "13002526500013" : {
    "name" : "DIRECTION INTERMINISTERIELLE DU NUMERIQUE"
  },
  "17320001500019" : {
    "name" : "PREFECTURE DE DEPARTEMENT GERS"
  },
  "77792713800019" : {
    "name" : "CAISSE D'ALLOCATIONS FAMILIALES DE LA CORREZE"
  },
  "77864952500020" : {
    "name" : "CAISSE D'ALLOCATIONS FAMILIALES DE L'YONNE"
  },
  "77536959800021" : {
    "name" : "CAISSE D ALLOCATIONS FAMILIALES DU LOIR ET CHER"
  }
}

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
    populateServices(services);
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

  var currentDemarches = listDemarches[ e.target.dataset.siret ];
  var demarchesID = [];
  currentDemarches.forEach( demarche => demarchesID.push( demarche[0] ) );

  var selectedDemarches = demarches.filter( demarche => {
    return demarchesID.indexOf(demarche.number.toString()) > -1;
  } );

  populateModal( selectedDemarches );
}

function populateModal ( selectedDemarches ) {

  const listContainer = document.querySelector('#fiche-identite-list-demarches');
  var listDemarches = "";
  
  selectedDemarches.forEach( demarche => {
    // ADD BUTTON TO MODAL
    listDemarches += '<button class="fr-btn fr-btn--sm fr-btn--secondary">' + demarche.title + '</button>';

    console.log( demarche );
  } );

  listContainer.innerHTML = listDemarches;
}

function populateServices ( services ) {

  var listServices = "";
  var servicesSIRET = [];
  var index = 0;

  services.forEach( (service, i) => {

      if ( service[1] != '' ) {

        if ( servicesSIRET.indexOf( service[1] ) < 0 ) {
            if (index < MAX_DISPLAY_SERVICES) {
              listServices += '<div class="fr-col fr-col-md-6"><div class="fr-tile fr-tile--horizontal fr-enlarge-link tile-fiche-identite" data-siret="'+service[1]+'" data-title="'+API_SIRET[service[1]].name+'"><div class="fr-tile__body"><div class="fr-tile__content"><h3 class="fr-tile__title"><a href="#" data-fr-opened="false" aria-controls="fr-modal-fiche" data-siret="'+service[1]+'">'+API_SIRET[service[1]].name+'</a></h3><p class="fr-tile__detail">SIRET : '+service[1]+' -&nbsp;<span class="total-demarches"></span></p></div></div></div></div>';
            }
            servicesSIRET.push( service[1] );
            index++;
        }

        // TODO FILTRER LES DEMARCHES AVANT DE LES AJOUTER
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
