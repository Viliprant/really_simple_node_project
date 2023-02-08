const express = require("express");
const app = express();
const port = 3000;

//* Routers
const { apiRouter } = require("./routes/apiRouter");

//* Traitement des requetes
app.use(express.json())

//* Routes
// GET at ROOT
app.get("/", (req, res) => {
  //* On envoie la réponse
  res.send({
    message: "Bienvenue sur mon serveur, testez /api",
  });
});

//* Child Routes
// GET at '/api'
app.use("/api", apiRouter);

//* Run the API
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
