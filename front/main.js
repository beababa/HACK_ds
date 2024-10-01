import './style.css'
import Papa from "papaparse";
import map from "./map.js";

// INIT MAP
map.init();

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
  "11004601800013" : {
    "name" : "MINISTERE DE LA CULTURE"
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

// NUMERO SIRET MINISTRERE CULTURE 
// 110 046 018 00013

const MAX_DISPLAY_SERVICES = 11;
var listDemarches = {};

// GET LIST OF ETABLISSEMENTS
var requestServices = "hackathon-ds-service.csv";

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
    // map.populateServices(services);
  } catch (error) {
    console.error(error.message);
  }
}
getDataServices();

// GET LIST OF ETABLISSEMENTS
var requestDemarches = "demarches.json";
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
    listDemarches += '<a href="#" class="fr-tag fr-mr-1w fr-mb-1w" target="_self">' + demarche.title + '</a>';

    console.log( demarche );
  } );

  listContainer.innerHTML = listDemarches;
}

function populateServices ( services ) {

  var listServices = "";
  var servicesSIRET = [];
  var index = 0;

  services.forEach( (service, i) => {

    var currentSIRET = service[1];

      if ( currentSIRET != '' ) {

        if ( servicesSIRET.indexOf( currentSIRET ) < 0 ) {
            if (index < MAX_DISPLAY_SERVICES || currentSIRET == "11004601800013" ) {
              var serviceName = API_SIRET[currentSIRET] ? API_SIRET[currentSIRET].name : '-';
              listServices += '<div class="fr-col fr-col-md-6"><div class="fr-tile fr-tile--horizontal fr-enlarge-link tile-fiche-identite" data-siret="'+service[1]+'" data-title="'+name+'"><div class="fr-tile__body"><div class="fr-tile__content"><h3 class="fr-tile__title"><a href="#" data-fr-opened="false" aria-controls="fr-modal-fiche" data-siret="'+service[1]+'">'+serviceName+'</a></h3><p class="fr-tile__detail">SIRET : '+service[1]+' -&nbsp;<span class="total-demarches"></span></p></div></div></div></div>';
            }
            servicesSIRET.push( currentSIRET );
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
