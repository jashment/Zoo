const Animal = require('../models/animal.model');

require('dotenv').config();


const test = (req, res) => {
    res.send('Greetings from the Test Controller!')
}

const animals_all = (req, res, next) => {
    Animal.find({})
    .then(allAnimals => {
        console.log(allAnimals)
        res.send(allAnimals)
    })
    .catch(err => console.log(err))
}

const animal_create = (req, res, next) => {
    let animal = new Animal(
        {
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            emotion: req.body.emotion,
            genus: req.body.genus
        }
    );

    animal.save(function (err) {
        if (err) {
            return next(err)
        }
        res.send('Animal Created successfully')
    })
};

const animal_details = (req, res, next) => {
    Animal.findById(req.params.id, function (err, animal) {
        if (err) return next(err)
        res.send(animal)
    })
}

const animal_update = (req, res, next) => {
    Animal.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, animal) {
        if (err) return next(err)
        res.send('Animal udpated.')
    })
}

const animal_delete = (req, res, next) => {
    Animal.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully')
    })
}

module.exports = {
    test,
    animals_all,
    animal_create,
    animal_delete,
    animal_details,
    animal_update
}