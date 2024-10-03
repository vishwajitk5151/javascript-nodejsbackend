
require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./config/mongoose-connection'); // Assuming this uses MONGODB_URI from env
const cookieParser = require('cookie-parser');
const path = require('path');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');

// Access environment variables
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.get('/', (req, res) => {
    res.send('hey');
});

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
