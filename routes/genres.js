
const express = require('express');
const router = express.Router();
const Joi = require('joi');
router.use(express.json());


var genres = [
    {id: 1, name: 'Horror' },
    {id: 2, name:'Action'  },
    {id: 3, name: 'Funny'  },
    {id: 4, name:'Romantic'} 
];

router.get('/', (req,res)=> {
res.send(genres);
});
//get a specific genre with the known ID
router.get('/:id', (req,res)=> {
const genre = genres.find( c => c.id === parseInt(req.params.id));
res.send(genre);
});

router.post('/', (req,res)=> {
const {error} = validation(req.body);
if (error){
 res.status(400).send(error.details[0].message);
 return; }
const genre = {
       id: genres.length +1,
       name: req.body.name
};
genres.push(genre);
res.send(genre);
});
// put request - to update data 
router.put('/:id', (req,res)=> {
// check if id is avaialable- if not bad request 404
const genre = genres.find( c => c.id === parseInt(req.params.id));
if(!genre)
   return res.status(404).send('genre with this id does not found');
   
// check if data provided for updation is valid
const {error} = validation(req.body);
if (error){
  res.status(400).send(error.details[0].message);
  return; }
// if everything is good, update the genre and return it to the client
genre.name = req.body.name;
res.send(genre);
});
// Delete a genre from the genres array by a known valid ID
router.delete('/:id', (req,res)=> {
// check if id is avaialable- if not bad request 404
const genre = genres.find( c => c.id === parseInt(req.params.id));
if(!genre) 
 return res.status(404).send('Course with this id does not found');
 // if valid id delete the genre 
 const index = genres.indexOf(genre);
 genres.splice(index,1);
 res.send(genre);
});

// VALIDATION FUNCTION
function validation(genre) {
const schema = {
   name: Joi.string().min(3).required() };
   return Joi.validate(genre,schema);
}
module.exports = router;