module.exports = (app) => { 
    const pokemon = require("../controllers/pokemon.controller");
    const routes = require("express").Router();

    routes.get("/", pokemon.getAll);
    routes.get("/:id", pokemon.find);
    routes.get("/name/:name", pokemon.findByName);
    routes.post("/", pokemon.create);
    routes.put("/:id", pokemon.update);
    routes.delete("/:id", pokemon.delete);

    app.use("/pokemon", routes)
}