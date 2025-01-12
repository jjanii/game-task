const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const games = require('./data'); // Import the list of games

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Configure session middleware
app.use(session({
    secret: 'game-task-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Authentication route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = { player1: 'player1', player2: 'player2' };

    if (users[username] && users[username] === password) {
        req.session.user = { username };
        return res.status(200).json({ message: 'Login successful' });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

// Protected route for games
app.get('/games', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    res.json(games);
});

app.post('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to log out' });
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    } else {
        res.status(400).json({ message: 'No active session to log out from' });
    }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
