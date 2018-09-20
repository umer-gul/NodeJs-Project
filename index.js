const express = require('express');
const app = express();
const Joi = require('joi');
const genres = require('./routes/genres');
app.use('/api/genres', genres);

app.use(express.json());




const port = process.env.port || 3000;
app.listen(port, ()=>{ console.log(`listening on port  ${port}`)});