const express = require('express');
const app = express.Router();
const drinkController = require('../controllers/drinkController')
const auth = require('../middleware/auth')

app.get("/", drinkController.getDrink);

app.get("/:id",drinkController.getDrinkById);

app.get("/name/:name",drinkController.getDrinkByName);

app.post("/",auth, drinkController.addDrink);

app.put("/:id",auth,drinkController.editDrink);

app.delete("/:id",auth, drinkController.deleteDrink);

module.exports = app;