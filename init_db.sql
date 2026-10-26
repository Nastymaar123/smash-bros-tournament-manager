CREATE TABLE players (

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gamerTag TEXT NOT NULL,
    realName TEXT NOT NULL,
    mainCharacter TEXT NOT NULL,
    region TEXT NOT NULL,
    active INTEGER NOT NULL
);

CREATE TABLE Tournaments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tournamentName TEXT NOT NULL,
    tournamentDate TEXT NOT NULL,
    tournamentLocation TEXT NOT NULL,
    playerCount INTEGER NOT NULL,
    tournamentStatus TEXT NOT NULL,
    prizePool INTEGER NOT NULL
);

CREATE TABLE Registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    playerId INTEGER NOT NULL,
    tournamentId INTEGER NOT NULL,
    registrationDate TEXT NOT NULL,
    seeding INTEGER NOT NULL,
    placement INTEGER,
    UNIQUE (playerId, tournamentId),
    FOREIGN KEY (playerId) REFERENCES players(id),
    FOREIGN KEY (tournamentId) REFERENCES Tournaments(id)
);

INSERT INTO players (gamerTag, realName, mainCharacter, region, active) VALUES
('Zain', 'Zain Naghmai', 'Marth', 'Virginia', 1),
('Cody Schwab', 'Cody Schwab', 'Fox', 'Michigan', 1),
('Hungrybox', 'Juan Debiedma', 'Jigglypuff', 'Florida', 1),
('Joshman', 'Joshua Lyras', 'Fox', 'Australia', 1),
('moky', 'Curtis Pratt', 'Fox', 'Canada', 1),
('Axe', 'Jeffrey Willamson', 'Pikachu', 'Arazion', 1),
('Jmook', 'Jake DiRado', 'Sheik', 'New York', 1),
('SDJ', 'N/A', 'Jigglypuff', 'New York', 1),
('Wizzrobe', 'Justin Hallett', 'Captain Falcon', 'Florida', 1),
('lloD', 'Arjun Malhotra', 'Peach', 'Virginia', 1),
('Trif', 'Alvaro Moral', 'Peach', 'Spain', 1),
('Nicki', 'N/A', 'Ice Climbers', 'Germany', 1),
('Soonsay', 'Miles Foster', 'Fox', 'Canada', 1),
('Aklo', 'Dawud Rahman', 'Fox', 'New York', 1),
('Salt', 'Alexandra Rennie', 'Captain Falcon', 'Oregon', 1),
('Kurdo', 'Kyle Kurdo', 'Sheik', 'Florida', 1),
('Aura', 'Derek Olsen', 'Peach', 'Oregon', 1),
('Ginger', 'Avery Wilson', 'Falco', 'Michigan', 1),
('Junebug', 'Arjun Rao', 'Donkey Kong', 'Virginia', 1),
('Ossify', 'Dillon Duhalde', 'Marth', 'Michigan', 1),
('Magi', 'Sasha Sullivan', 'Falco', 'Louisiana', 1),
('MOF', 'Aly Oquendo', 'Ice Climbers', 'Florida', 1),
('aMSa', 'Masaya Chikamoto', 'Yoshi', 'Japan', 1),
('Panda', 'Brandon Orooji', 'Fox', 'Florida', 1),
('Zamu', 'Danielle Bernstein', 'Fox', 'Illinois', 1),
('n0ne', 'Edgard Sheleby', 'Captain Falcon', 'Canada', 1),
('SluG', 'Hugh Hegarty', 'Ice Climbers', 'Philadelphia', 1),
('RapMonster', 'Dylan Do', 'Luigi', 'Virginia', 1),
('Khryke', 'Jacob Gilbert', 'Marth', 'Virginia', 1),
('404Cray', 'Arthur Hernandez', 'Falco', 'New Jersey', 1),
('JChu', 'N/A', 'Pikachu', 'Florida', 1);

INSERT INTO Tournaments (tournamentName, tournamentDate, tournamentLocation, playerCount, tournamentStatus, prizePool) VALUES
('Pats House 5', '2026-05-02', 'California', 30, 'Completed', 1000),
('GOML 2026', '2026-07-28', 'Canada', 24, 'Ongoing', 2000),
('SuperNova 2026', '2026-08-06', 'Baltimore', 32, 'Upcoming', 3000),
('Smash Summit 2026', '2026-09-25', 'Los Angeles', 16, 'Upcoming', 4000),
('Genesis 14', '2026-09-30', 'San Francisco', 50, 'Upcoming', 5000),
('EVO 2026', '2026-10-05', 'Las Vegas', 100, 'Upcoming', 6000),
('The Big House 14', '2026-10-10', 'Michigan', 80, 'Upcoming', 7000),
('Frostbite 2026', '2026-10-20', 'Michigan', 40, 'Upcoming', 9000);




INSERT INTO Registrations (playerId, tournamentId, registrationDate, seeding, placement) VALUES
(1, 1, '2026-03-01', 1, 1),
(2, 1, '2026-03-02', 2, 2),
(3, 1, '2026-03-03', 3, 3),
(4, 1, '2026-03-04', 4, 4),
(5, 1, '2026-03-05', 5, 5),

(6, 2, '2026-07-28', 1, NULL),
(7, 2, '2026-07-29', 2, NULL),
(8, 2, '2026-07-30', 3, NULL),
(9, 2, '2026-07-31', 4, NULL),
(10, 2, '2026-07-01', 5, NULL),

(11, 3, '2026-05-01', 1, NULL),
(12, 3, '2026-06-02', 2, NULL),
(13, 3, '2026-07-03', 3, NULL),
(14, 3, '2026-03-04', 4, NULL),
(15, 3, '2026-04-05', 5, NULL),

(16, 4, '2026-04-01', 1, NULL),
(17, 4, '2026-04-02', 2, NULL),
(18, 4, '2026-04-03', 3, NULL),
(19, 4, '2026-04-04', 4, NULL),
(20, 4, '2026-04-05', 5, NULL),

(21, 5, '2026-05-01', 1, NULL),
(22, 5, '2026-06-02', 2, NULL),
(23, 5, '2026-07-03', 3, NULL),
(24, 5, '2026-03-04', 4, NULL),
(25, 5, '2026-04-05', 5, NULL),

(26, 6, '2026-05-01', 1, NULL),
(27, 6, '2026-06-02', 2, NULL),
(28, 6, '2026-07-03', 3, NULL),
(29, 6, '2026-03-04', 4, NULL),
(30, 6, '2026-04-05', 5, NULL),

(11, 7, '2026-01-01', 1, NULL),
(25, 7, '2026-02-02', 2, NULL),
(30, 7, '2026-04-03', 3, NULL),
(29, 7, '2026-05-04', 4, NULL),
(14, 7, '2026-05-05', 5, NULL),

(12, 8, '2026-02-01', 1, NULL),
(20, 8, '2026-02-02', 2, NULL),
(13, 8, '2026-04-03', 3, NULL),
(19, 8, '2026-05-04', 4, NULL),
(23, 8, '2026-05-05', 5, NULL);
