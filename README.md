# Smash Bros Tournament Manager

## Author
Maar Drew-Joseph

## Description
This project is a web application built using ExpressJS, SQLite, HTML, CSS, and JavaScript. The application allows users to manage Super Smash Bros tournaments by maintaining information about players, tournaments, and tournament registrations. The frontend communicates with the backend through a REST API using AJAX.

---

# Requirements

Install the required packages: 

```bash
npm install
```

or

```bash
npm install express better-sqlite3
```

---

# Initializing the Database

The database is created using the SQL script **init_db.sql**.

If the database does not already exist, run:

```bash
sqlite3 smash.db
```

At the SQLite prompt, execute:

```sql
.read init_db.sql
```

This creates the following tables:

- players
- tournaments
- registrations

and inserts the initial data into each table.

Exit SQLite with:

```sql
.quit
```

---

# Running the Application

Start the server by running:

```bash
node index.js
```

The application runs on:

```
http://localhost:6000
```

Base API route:

```
http://localhost:6000/api/final/
```

---

# HTTP Methods

## GET

The GET method retrieves information from the database.

### Retrieve all players

```
GET /api/final/players
```

### Retrieve one player

```
GET /api/final/players/1
```

### Retrieve all tournaments

```
GET /api/final/tournaments
```

### Retrieve one tournament

```
GET /api/final/tournaments/1
```

### Retrieve all registrations

```
GET /api/final/registrations
```

### Retrieve one registration

```
GET /api/final/registrations/1
```


Returns **404 Not Found** if the requested record does not exist.

---

## POST

The POST method creates a new record.


### Tournament

```
POST /api/final/tournaments
```

Example JSON:

```json
{
    "name": "Genesis X",
    "location": "San Jose, CA",
    "date": "2026-08-01",
    "player count": 200,
    "status": "Ongoing",
    "prize pool": 5000

    
}
```

### Registration

```
POST /api/final/registrations
```

Example JSON:

```json
{
    "playerId": 30,
    "tournamentId": 1,
    "registrationDate": "2026-08-01",
    "seeding": 1,
    "placement": null
}
```

Returns **201 Created** when successful.

Returns **400 Bad Request** if required fields are missing or invalid.

---

## PUT

The PUT method updates an existing record.

### Player

```
PUT /api/final/players/1
```

Example JSON:

```json
{
    "gamerTag": "Xain",
    "mainCharacter": "Roy",
    "region": "MDVA",
    "id": 1,
    
}
```

Returns **200 OK** if the record is successfully updated.

Returns **404 Not Found** if the record does not exist.

Returns **400 Bad Request** if the request body is invalid.

---

## DELETE

The DELETE method removes a record from the database.

### Player

```
DELETE /api/final/players/5
```


### Registration

```
DELETE /api/final/registrations/10
```

Returns **200 No Content** when the record is successfully deleted.

Returns **404 Not Found** if the record does not exist.

Retuns **400 Bad Request** if the request body is invalid 
---



# Project Files

- `index.js` – ExpressJS server and REST API
- `public/index.html` – Main application page
- `public/style.css` – Application styling
- `public/app.js` – Frontend JavaScript and AJAX functionality
- `init_db.sql` – Creates and initializes the SQLite database
- `smash.db` – SQLite database
- `package.json` – Project dependencies
- `package-lock.json` – Dependency lock file
- `README.md` – Project documentation