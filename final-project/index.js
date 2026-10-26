/* 
COMPLETE THE TOP COMMENT BLOCK BELOW
Maar Drew-Joseph
CPSC 342, Summer 2026
Professor Walther
Final Project
Created: 8/02/2026
Due Date: 8/05/2026
Major: Information Technology
File: index.js
Purpose: This file sets up an Express server that serves a web application for managing Smash Bros tournaments. It connects to a SQLite database using the better-sqlite3 library and provides various API endpoints for retrieving, adding, updating, and deleting players, tournaments, and registrations. The server listens on port 6000 and serves static files from the 'public' directory.

*/


let express = require('express')
let path = require('path')
let Database = require('better-sqlite3')
let app = express()
let PORT = 6000

app.use(express.json());

//Connect to the database
let db;
try {
    db = new Database('smash.db');
} catch (err) {
    console.log("Error opening database: " + err.message);
    throw err;
}
//Serve the index.html file when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//Serve static files from the 'public' directory
app.use(express.static('public'));

//API endpoint to check if the server is running
app.get('/api/final/', (req, res) => {
    res.json({ message: "Hello from the server!" });
});

//API endpoint to retrieve all players from the database
app.get('/api/final/players', (req, res) => {

    let sql = 'SELECT * FROM players';

    try {
        let rows = db.prepare(sql).all();
        res.json(rows);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//API endpoint to retrieve a specific player by ID from the database
app.get('/api/final/players/:id', (req, res) => {
    let sql = 'SELECT * FROM players WHERE id = ?';
    try {
        let rows = db.prepare(sql).all(req.params.id);
        if (rows.length === 0) {
            res.status(404).json({ error: "Player not found" });
        } else {
            res.json(rows[0]);
        }

    } catch (err) {
        res.status(400).json({ error: err.message });
    }

});

//API endpoint to retrieve all tournaments from the database
app.get('/api/final/tournaments', (req, res) => {

    let sql = `SELECT * FROM tournaments`;

    try {
        let rows = db.prepare(sql).all();
        res.json(rows);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//API endpoint to retrieve a specific tournament by ID from the database
app.get('/api/final/tournaments/:id', (req, res) => {
    let sql = 'SELECT * FROM tournaments WHERE id = ?';

    try {
        let rows = db.prepare(sql).all(req.params.id);
        if (rows.length === 0) {
            res.status(404).json({ error: "Tournament not found" });
        } else {
            res.json(rows[0]);
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }

});

//API endpoint to retrieve all registrations from the database
app.get('/api/final/registrations', (req, res) => {
    let sql = 'SELECT * FROM registrations';

    try {
        let rows = db.prepare(sql).all();
        res.json(rows);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }

});

//API endpoint to retrieve a specific registration by ID from the database
app.get('/api/final/registrations/:id', (req, res) => {
    let sql = 'SELECT * FROM registrations WHERE id = ?';
    try {
        let rows = db.prepare(sql).all(req.params.id);
        if (rows.length === 0) {
            res.status(404).json({ error: "Registration not found" });
        } else {
            res.json(rows[0]);
        }
        

    } catch (err) {
        res.status(400).json({ error: err.message });
    }

});

//API endpoint to add a new registration to the database
app.post('/api/final/registrations/:playerId/:tournamentId/:registrationDate/:seeding/:placement', (req, res) => {

    let sql = 'INSERT INTO registrations (playerid, tournamentid, registrationDate, seeding, placement) VALUES (?, ?, ?, ?, ?)';
    let params = [req.params.playerId, req.params.tournamentId, req.params.registrationDate, req.params.seeding, req.params.placement];

    try {
        let info = db.prepare(sql).run(params);
        res.status(200);
        res.set('Location', '/api/final/registrations/' + info.lastInsertRowid);
        res.end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

});

//API endpoint to delete a registration by ID from the database
app.delete('/api/final/registrations/:id', (req, res) => {
    let sqlSelect = 'SELECT * FROM registrations WHERE id = ?';

    try {
        let rows = db.prepare(sqlSelect).all(req.params.id);
        if (rows.length === 0) {
            res.status(404).end();
        } else {
            let sqlDelete = 'DELETE FROM registrations WHERE id = ?';
            db.prepare(sqlDelete).run(req.params.id);
            res.status(200).end();
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

});



//API endpoint to add a new tournament to the database
app.post('/api/final/tournaments', (req, res) => {

    let sql = 'INSERT INTO tournaments (tournamentname, tournamentdate, tournamentlocation, playercount, tournamentstatus, prizepool) VALUES (?, ?, ?, ?, ?, ?)';
    let params = [req.body.tournamentName, req.body.tournamentDate, req.body.tournamentLocation, req.body.playerCount, req.body.tournamentStatus, req.body.prizePool];
    try {
        let info = db.prepare(sql).run(params);
        res.status(201);
        res.set('Location', '/api/final/tournaments/' + info.lastInsertRowid);
        res.end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }   
});
//API endpoint to update a player by ID in the database

app.put('/api/final/players/:id/:gamerTag/:mainCharacter/:region', (req, res) => {
    
    let sqlSelect = 'SELECT * FROM players WHERE id = ?';
    try {
        let rows = db.prepare(sqlSelect).all(req.params.id);
        if (rows.length === 0) {
            res.status(404).end();
        } else {
            let row = rows[0];
            let sqlUpdate = 'UPDATE players SET gamertag = ?, maincharacter = ?, region = ? WHERE id = ?';
            let params = [
                req.params.gamerTag,
                req.params.mainCharacter,
                req.params.region,
                req.params.id
            ];
            db.prepare(sqlUpdate).run(params);
            res.status(200).end();
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//API endpoint to delete a player by ID from the database
app.delete('/api/final/players/:id', (req, res) => {
    let sqlSelect = 'SELECT * FROM players WHERE id = ?';

    try {
        let rows = db.prepare(sqlSelect).all(req.params.id);
        if (rows.length === 0) {
            res.status(404).end();
        } else {
            let sqlDelete = 'DELETE FROM players WHERE id = ?';
            db.prepare(sqlDelete).run(req.params.id);
            res.status(200).end();
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//default response
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});