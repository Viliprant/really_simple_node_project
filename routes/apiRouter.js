const express = require("express");
const { petRouter } = require("./api/petRouter");

//* Routers
const apiRouter = express.Router();

//* Routes
// GET at ROOT
apiRouter.get("/", (req, res) => {
  //* On envoie la réponse
  res.send({
    message: "Bienvenue dans l'API",
  });
});

//* Child Routes
// GET at '/api/pet'
apiRouter.use('/pet', petRouter);

module.exports = { apiRouter };
