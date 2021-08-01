if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const indexRoute = require('./routes/index');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.set(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => {
	console.log('Connected to mongoose');
});

app.listen(process.env.PORT || 4000, () => console.log('Running on 4000'));

app.use('/', indexRoute);
