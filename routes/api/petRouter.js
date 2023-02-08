const express = require("express");
const petRouter = express.Router();

//* Listes des animaux
let animals = [
  {
    id: 1,
    espece: "Chien",
    nom: "Chien1",
    age: 4,
  },
  {
    id: 2,
    espece: "Chien",
    nom: "Chiené",
    age: 10,
  },
  {
    id: 3,
    espece: "Chat",
    nom: "Chat1",
    age: 6,
  },
  {
    id: 4,
    espece: "Chat",
    nom: "Chat2",
    age: 2,
  },
];

//* Routes
// GET at ROOT
petRouter.get("/", function (req, res) {
  //* On envoie la réponse
  res.send({
    message: "Bienvenue dans l'animalerie",
  });
});

// GET at /about
petRouter.get("/about", function (req, res) {
  //* On envoie la réponse
  res.send({
    message: "Super description",
  });
});

// GET ONE at /all
petRouter.get("/all", function (req, res) {
  //* On envoie la réponse
  res.send({
    message: "Liste des animaux",
    animals: animals,
  });
});

// GET ALL at /{:id}
petRouter.get("/:id", function (req, res) {
  //* On récupère le paramètre de la requete
  const id = req.params.id;

  //* On le cherche dans la liste
  const pets = animals.filter((animal) => animal.id == id);

  //* S'il y en a un
  if (pets.length > 0) {
    //* On envoie la réponse
    res.send({
      message: "L'animal a été trouvé",
      animal: pets[0],
    });
  }
  //* Sinon
  else {
    //* On envoie la réponse avec un status 'BAD REQUEST' (400)
    res.status(400).send({
      message: "L'animal n'a pas été trouvé",
    });
  }
});

// POST at /
petRouter.post("/", function (req, res) {
  //* On récupère ce qu'il y a dans le body de la requete
  const body = req.body;

  //* On cherche l'ID le plus grand pour connaitre le prochain ID
  const pet = animals.reduce(function (prev, curr) {
    return prev.id > curr.id ? prev : curr;
  });

  //* On crée le nouvel animal
  const newPet = {
    ...body,
    id: pet.id + 1,
  };

  //* On l'ajoute au tableau
  animals.push(newPet);

  //* On envoie la réponse
  res.send({
    message: "L'animal a bien été ajouté",
    animal: newPet,
  });
});

// DELETE at /{:id}
petRouter.delete("/:id", function (req, res) {
  //* On récupère le paramètre de la requete
  const id = req.params.id;

  //* On garde uniquement les animaux qui n'ont pas cet ID
  animals = animals.filter((animal) => animal.id != id)

  //* On envoie la réponse
  res.send({
    message: "L'animal a bien été supprimé",
    animals: animals,
  });
});

module.exports = { petRouter };
