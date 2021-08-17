const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;;
app.use(express.json());

// Importing routes
const surprise = require('./routes/surprise');
const stats = require('./routes/stats');
const welcome = require('./routes/welcome');
app.use('/api', surprise);
app.use('/api', stats);
app.use('', welcome);

app.listen(PORT, ()=> {
    console.log('Server started on port ' + PORT + '.');
    console.log('Go to http://localhost:3000');
    console.log('Enjoy!');
});


