/* 
COMPLETE THE TOP COMMENT BLOCK BELOW
Maar Drew-Joseph
CPSC 342, Summer 2026
Professor Walther
Final Project
Created: 8/02/2026
Due Date: 8/05/2026
Major: Information Technology
File: app.js
Purpose: This file contains the JavaScript code for handling AJAX requests and updating the DOM based on user interactions with the form elements. It includes functions to initialize the page, handle form submissions for searching, adding, updating, and removing grades, and building the grades table dynamically.

*/




"use strict";

let currentView = "players";

//wait until the page is loaded
window.onload = initializePage;

//Name: initializePage
//Purpose: This function is responsible for initializing the page
// and setting up event listeners for the navigation buttons.
//Parameters: None
//Returns: None
function initializePage() {

    let app = document.getElementById("app");
    let template = document.getElementById("shell-template");

    app.appendChild(template.content.cloneNode(true));


    buildNavigation();
    showPlayers();
    
    
}
//Name: buildNavigation
//Description: This function is responsible for building the navigation
// elements and setting up event listeners for the navigation buttons
//Parameters: None
//Returns: None
function buildNavigation() {
    
    document.querySelector("[data-view='players']").addEventListener("click", showPlayers);
    document.querySelector("[data-view='tournaments']").addEventListener("click", showTournaments);
    document.querySelector("[data-view='registrations']").addEventListener("click", showRegistrations);

}

//Name: showPlayers
//Description: This function is responsible for displaying the players
//Parameters: None
//Returns: None
function showPlayers() {

    currentView = "players";

    let req = new XMLHttpRequest();
    req.open("GET", "/api/final/players", true);
    req.addEventListener("load", function () {
        if (req.status == 200) {

            buildPlayersTable(JSON.parse(req.responseText));
        }
    });
 
    req.send();
}

//Name: showTournaments
//Description: This function is responsible for displaying the tournaments
//Parameters: None
//Returns: None
function showTournaments() {

    currentView = "tournaments";

    let req = new XMLHttpRequest();
    req.open("GET", "/api/final/tournaments", true);
    req.addEventListener("load", function () {
        if (req.status == 200) {

            buildTournamentsTable(JSON.parse(req.responseText));
        }
    });
    req.send();
}
//Name: showRegistrations
//Description: This function is responsible for displaying the registrations
//Parameters: None
//Returns: None
function showRegistrations() {

    currentView = "registrations";

    let req = new XMLHttpRequest();
    req.open("GET", "/api/final/registrations", true);
    req.addEventListener("load", function () {
        if (req.status == 200) {
            buildRegistrationsTable(JSON.parse(req.responseText));
        }
    });
    req.send();
    
}

//Name: searchPlayerListener
//Description: This function is responsible for handling the search player button click event
//Parameters: e - the event object
//Returns: None
function searchPlayerListener(e) {
    let playerId = document.getElementById("player-id").value;

    let req = new XMLHttpRequest();
    req.open("GET", `/api/final/players/${playerId}`, true);
    req.addEventListener("load", function () {
        if (req.status == 200) {
            let player = JSON.parse(req.responseText);
            buildPlayersTable([player])
        }
    });
    req.send();
}
//Name: updatePlayerListener
//Description: This function is responsible for handling the update player button click event
//Parameters: e - the event object
//Returns: None
function updatePlayerListener(e) {
    let playerId = document.getElementById("player-id").value;
    let gamerTag = document.getElementById("update-gamer-tag").value;
    let mainCharacter = document.getElementById("update-main-character").value;
    let region = document.getElementById("update-region").value;

    let req = new XMLHttpRequest();
    req.open("PUT", `/api/final/players/${playerId}/${gamerTag}/${mainCharacter}/${region}`, true);
    req.addEventListener("load", function () {
        if (req.status == 200) {
            showPlayers();
        }
    });
    req.send();
}

//Name: deletePlayerListener
//Description: This function is responsible for handling the delete player button click event
//Parameters: e - the event object
//Returns: None
function deletePlayerListener(e) {
    let playerId = document.getElementById("player-id").value;

    let req = new XMLHttpRequest();
    req.open("DELETE", `/api/final/players/${playerId}`, true);
    req.addEventListener("load", function () {
        if (req.status == 200) {
            showPlayers();
        }
    });
    req.send();
}
//Name: searchTournamentListener
//Description: This function is responsible for handling the search tournament button click event
//Parameters: e - the event object
//Returns: None
function searchTournamentListener(e) {
    let tournamentId = document.getElementById("search-tournament-id").value;
    
    let req = new XMLHttpRequest();
    req.open("GET", `/api/final/tournaments/${tournamentId}`, true);
    req.addEventListener("load", function () {
        if (req.status == 200) {

            let tournament = JSON.parse(req.responseText);

            buildTournamentsTable([tournament]);
        }
    });
    req.send();
} 

//Name: addTournamentListener
//Description: This function is responsible for handling the add tournament button click event
//Parameters: e - the event object
//Returns: None
function addTournamentListener(e) {
    let tournamentName = document.getElementById("add-tournament-name").value;
    let tournamentDate = document.getElementById("add-tournament-date").value;
    let tournamentLocation = document.getElementById("add-tournament-location").value;
    let playerCount = document.getElementById("add-player-count").value;
    let tournamentStatus = document.getElementById("add-tournament-status").value;
    let prizePool = document.getElementById("add-prize-pool").value;
    


    let data = {tournamentName: tournamentName, tournamentDate: tournamentDate, tournamentLocation: tournamentLocation, playerCount: playerCount, tournamentStatus: tournamentStatus, prizePool: prizePool};

    let req = new XMLHttpRequest();
    req.open("POST", '/api/final/tournaments', true);
    req.setRequestHeader("Content-Type", "application/json")
    req.addEventListener("load", function () {
        if (req.status == 201) {
            showTournaments();
        }
    });
    req.send(JSON.stringify(data));
}
//Name: searchRegistrationListener
//Description: This function is responsible for handling the search registration button click event
//Parameters: e - the event object
//Returns: None
function searchRegistrationListener(e) {
    let registrationId = document.getElementById("search-registration-id").value;

    let req = new XMLHttpRequest();
    req.open("GET", `/api/final/registrations/${registrationId}`, true);
    req.addEventListener("load", function () {
        if (req.status === 200) {
            let registration = JSON.parse(req.responseText);

            buildRegistrationsTable([registration]);

        }
    });
    req.send();
}

//Name: addRegistrationListener
//Description: This function is responsible for handling the add registration button click event
//Parameters: e - the event object
//Returns: None
function addRegistrationListener(e) {
    let playerId = document.getElementById("add-player-id").value;
    let tournamentId = document.getElementById("add-tournament-id").value;
    let registrationDate = document.getElementById("add-registration-date").value;
    let seeding = document.getElementById("add-seeding").value;
    let placement = document.getElementById("add-placement").value;

    let req = new XMLHttpRequest();
    req.open("POST", `/api/final/registrations/${playerId}/${tournamentId}/${registrationDate}/${seeding}/${placement}`, true);
    req.addEventListener("load", function () {
        if (req.status == 200) {
            showRegistrations();
        }
    });
    req.send();
}

//Name: deleteRegistrationListener
//Description: This function is responsible for handling the delete registration button click event
//Parameters: e - the event object
//Returns: None
function deleteRegistrationListener(e) {
    let registrationId = document.getElementById("search-registration-id").value;
    
    if (registrationId === "") {
        console.error("Enter a registration ID.");
        return;
    }
    
    let req = new XMLHttpRequest();
    req.open("DELETE", `/api/final/registrations/${registrationId}`, true);
    req.addEventListener("load", function () {
        if (req.status == 200) {
            showRegistrations();
        } else {
            console.error( `Error deleting registration: ${req.status}`);
        }

    });

    req.send();
}
//Name: buildPlayersTable
//Description: This function is responsible for building the players table
//Parameters: players - an array of player objects
//Returns: None
function buildPlayersTable(players) {

    console.log(players);
console.log(players[0]);
    var view = document.getElementById("view");

    removeChildren(view);

    var heading = document.createElement("h2");
    heading.appendChild(document.createTextNode("Players"));
    view.appendChild(heading);

    let playerIdInput = document.createElement ("input");
    playerIdInput.type = "number";
    playerIdInput.id = "player-id";
    playerIdInput.placeholder = "Player ID";
    playerIdInput.min = "1";
    view.appendChild(playerIdInput);

    let gamerTagInput = document.createElement("input");
    gamerTagInput.type = "text"
    gamerTagInput.id = "update-gamer-tag";
    gamerTagInput.placeholder = "Gamer Tag";
    view.appendChild(gamerTagInput);

    let characterInput = document.createElement("input");
    characterInput.type = "text";
    characterInput.id = "update-main-character";
    characterInput.placeholder = "Main Character"
    view.appendChild(characterInput);

    let regionInput = document.createElement("input");
    regionInput.type = "text";
    regionInput.id = "update-region";
    regionInput.placeholder = "Region";
    view.appendChild(regionInput);

    let searchButton = document.createElement("button");
    searchButton.id = "search-player-button";
    searchButton.textContent = "Search Player";
    searchButton.addEventListener("click", searchPlayerListener);
    view.appendChild(searchButton);

    let updateButton = document.createElement("button");
    updateButton.id = "update-player-button";
    updateButton.textContent = "Update Player";
    updateButton.addEventListener("click", updatePlayerListener);
    view.appendChild(updateButton);

    let deleteButton = document.createElement("button");
    deleteButton.id = "delete-player-button";
    deleteButton.textContent = "Delete Player";
    deleteButton.addEventListener("click", deletePlayerListener);
    view.appendChild(deleteButton);

    


    var table = document.createElement("table");
    var headingRow = document.createElement("tr");

    headingRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("ID"));
    headingRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Gamer Tag"));
    headingRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Real Name"));
    headingRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Main Character"));
    headingRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Region"));
    table.appendChild(headingRow);

    for (let p of players) {
        let row = document.createElement("tr");

        let id = document.createElement("td");
        id.appendChild(document.createTextNode(p.id));
        row.appendChild(id);

        let gamerTag = document.createElement("td");
        gamerTag.appendChild(document.createTextNode(p.gamerTag));
        row.appendChild(gamerTag);

        let realName = document.createElement("td");
        realName.appendChild(document.createTextNode(p.realName));
        row.appendChild(realName);

        let mainCharacter = document.createElement("td");
        mainCharacter.appendChild(document.createTextNode(p.mainCharacter));
        row.appendChild(mainCharacter);

        let region = document.createElement("td");
        region.appendChild(document.createTextNode(p.region));
        row.appendChild(region);

        table.appendChild(row);
    }

    view.appendChild(table);
}
//Name: buildTournamentsTable
//Description: This function is responsible for building the tournaments table
//Parameters: tournaments - an array of tournament objects
//Returns: None
function buildTournamentsTable(tournaments) {
    var view = document.getElementById("view");

    removeChildren(view);
    

    var heading = document.createElement("h2");
    heading.appendChild(document.createTextNode("Tournaments"));
    view.appendChild(heading);
    
    var table = document.createElement("table");
    var headingRow = document.createElement("tr");


    let tournamentIdInput = document.createElement("input");
    tournamentIdInput.type = "number";
    tournamentIdInput.id = "search-tournament-id";
    tournamentIdInput.placeholder = "Tournament";
    view.appendChild(tournamentIdInput);

    let searchButton = document.createElement("button");
    searchButton.id = "search-tournament-button";
    searchButton.textContent = "Search Tournament";
    searchButton.addEventListener("click", searchTournamentListener);
    view.appendChild(searchButton);

    let tournamentNameInput = document.createElement("input");
    tournamentNameInput.id = "add-tournament-name";
    tournamentNameInput.placeholder = "Tournament Name";
    view.appendChild(tournamentNameInput);

    
    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "add-tournament-date";
    view.appendChild(dateInput);

    let tournamentLocationInput = document.createElement("input");
    tournamentLocationInput.id = "add-tournament-location";
    tournamentLocationInput.placeholder = "Location";
    view.appendChild(tournamentLocationInput);

    let playerCountInput = document.createElement("input");
    playerCountInput.id = "add-player-count";
    playerCountInput.placeholder = "Player Count";
    view.appendChild(playerCountInput);

    let tournamentStatusInput = document.createElement("input");
    tournamentStatusInput.id = "add-tournament-status";
    tournamentStatusInput.placeholder = "Status";
    view.appendChild(tournamentStatusInput);

    let prizePoolInput = document.createElement("input");
    prizePoolInput.id = "add-prize-pool";
    prizePoolInput.placeholder = "Prize Pool";
    view.appendChild(prizePoolInput);

    let addButton = document.createElement("button");
    searchButton.id = "add-tournament-button";
    addButton.textContent = "Add Tournament";
    addButton.addEventListener("click", addTournamentListener);
    view.appendChild(addButton);
    


    headingRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("ID"));
    headingRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Tournament Name"));
    headingRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Tournament Date"));
    headingRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Tournament Location"));
    headingRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Player Count"));
    headingRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Tournament Status"));
    headingRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Prize Pool"));


    table.appendChild(headingRow);

    for (let t of tournaments) {
        let row = document.createElement("tr");

        let id = document.createElement("td");
        id.appendChild(document.createTextNode(t.id));
        row.appendChild(id);

        let tournamentName = document.createElement("td");
        tournamentName.appendChild(document.createTextNode(t.tournamentName));
        row.appendChild(tournamentName);

        let tournamentDate = document.createElement("td");
        tournamentDate.appendChild(document.createTextNode(t.tournamentDate));
        row.appendChild(tournamentDate);

        let tournamentLocation = document.createElement("td");
        tournamentLocation.appendChild(document.createTextNode(t.tournamentLocation));
        row.appendChild(tournamentLocation);

        let playerCount = document.createElement("td");
        playerCount.appendChild(document.createTextNode(t.playerCount));
        row.appendChild(playerCount);

        let tournamentStatus = document.createElement("td");
        tournamentStatus.appendChild(document.createTextNode(t.tournamentStatus));
        row.appendChild(tournamentStatus);

        let prizePool = document.createElement("td");
        prizePool.appendChild(document.createTextNode(t.prizePool));
        row.appendChild(prizePool);

        table.appendChild(row);
    }

    view.appendChild(table);
}
//Name: buildRegistrationsTable
//Description: This function is responsible for building the registrations table
//Parameters: registrations - an array of registration objects
//Returns: None
function buildRegistrationsTable(registrations) {

    var view = document.getElementById("view");
    removeChildren(view);

    var heading = document.createElement("h2")
    heading.appendChild(document.createTextNode("Registrations"));
    view.appendChild(heading);
   
    let searchInput = document.createElement("input");
    searchInput.type = "number";
    searchInput.id = "search-registration-id";
    searchInput.placeholder = "Registration ID";
    searchInput.min = "1";
    view.appendChild(searchInput);


    let playerInput = document.createElement("input");
    playerInput.type = "number";
    playerInput.id = "add-player-id";
    playerInput.placeholder = "Player ID";
    view.appendChild(playerInput);

    let tournamentInput = document.createElement("input");
    tournamentInput.type = "number";
    tournamentInput.id = "add-tournament-id";
    tournamentInput.placeholder = "Tournament ID";
    view.appendChild(tournamentInput);

    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "add-registration-date";
    view.appendChild(dateInput);

    let seedingInput = document.createElement("input");
    seedingInput.type = "number"
    seedingInput.id = "add-seeding";
    seedingInput.placeholder = "Seeding";
    view.appendChild(seedingInput);


    let placementInput = document.createElement("input");
    placementInput.type = "number";
    placementInput.id = "add-placement";
    placementInput.placeholder = "Placement";
    view.appendChild(placementInput);

    let searchButton = document.createElement("button");
    searchButton.id = "search-registration-button";
    searchButton.textContent = "Search Registration";
    searchButton.addEventListener("click", searchRegistrationListener);
    view.appendChild(searchButton);

    let addButton = document.createElement("button");
    addButton.id = "add-registration-button";
    addButton.textContent = "Add Registration";
    addButton.addEventListener("click", addRegistrationListener);
    view.appendChild(addButton);

    let deleteButton = document.createElement("button");
    deleteButton.id = "delete-registration-button";
    deleteButton.textContent = "Delete Registration";
    deleteButton.addEventListener("click", deleteRegistrationListener);
    view.appendChild(deleteButton);

    var table = document.createElement("table");
    var headerRow = document.createElement("tr");


    headerRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("ID"));
    headerRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Player ID"));
    headerRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Tournament ID"));
    headerRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Registration Date"));
    headerRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Seeding"));
    headerRow.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Placement"));

    table.appendChild(headerRow);

    for (let r of registrations) {
        let row = document.createElement("tr");

        let id = document.createElement("td");
        id.appendChild(document.createTextNode(r.id));
        row.appendChild(id);

        let playerId = document.createElement("td");
        playerId.appendChild(document.createTextNode(r.playerId));
        row.appendChild(playerId);

        let tournamentId = document.createElement("td");
        tournamentId.appendChild(document.createTextNode(r.tournamentId));
        row.appendChild(tournamentId);

        let registrationDate = document.createElement("td");
        registrationDate.appendChild(document.createTextNode(r.registrationDate));
        row.appendChild(registrationDate);

        let seeding = document.createElement("td");
        seeding.appendChild(document.createTextNode(r.seeding));
        row.appendChild(seeding);

        let placement = document.createElement("td");
        placement.appendChild(document.createTextNode(r.placement ?? "N/A"));
        row.appendChild(placement);

        table.appendChild(row);
    }

    view.appendChild(table);

}
//Name: removeChildren
//Description: This function is responsible for removing all child nodes from a given node
//Parameters: node - the parent node from which to remove child nodes
//Returns: None
function removeChildren(node) {
    if (node !== null) {
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
    }
}