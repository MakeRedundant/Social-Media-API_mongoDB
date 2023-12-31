const mongoose = require('mongoose');
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const Social_Media = cwd.includes('Social-Media-API')
  ? cwd.split('Social-Media-API')[1]
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//  This will log mongoDB queries being currently executed!
mongoose.set('debug', true);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${Social_Media} running on port ${PORT}!`);
  });
});
