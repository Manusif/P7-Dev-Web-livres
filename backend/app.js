require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
// const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

const app = express();

// const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB :', err);
    });

app.use(helmet({crossOriginResourcePolicy: false})); 

app.use(express.json());

// Middleware gérant les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});




app.use('/api/user', userRoutes); // Exemple d'utilisation des routes utilisateur

app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;