// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';

const app = express();

// CORS configuration
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// Dummy user data
const users = [
    { username: 'user1', password: bcrypt.hashSync('password1', 8) },
    { username: 'user2', password: bcrypt.hashSync('password2', 8) },
];

const SECRET_KEY = 'your_secret_key'; // Ensure this is kept secure

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password });
    const user = users.find((u) => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, SECRET_KEY, {
            expiresIn: '1h',
        });
        console.log('Login successful for user:', user.username);
        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' });
        res.json({ username: user.username, token }); // Ensure token is sent in response
    } else {
        console.log('Login failed for username:', username);
        res.status(401).send('Invalid username or password');
    }
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.sendStatus(200);
});

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).send('No token provided.');
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send('Failed to authenticate token.');
        }
        req.username = decoded.username;
        next();
    });
};

app.get('/api/protected', verifyToken, (req, res) => {
    res.status(200).send('This is a protected route.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
