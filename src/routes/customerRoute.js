const express = require('express');
const app = express.Router();
const customerController = require('../controllers/customerController')
const auth = require('../middleware/auth')

app.get("/", customerController.getCustomer);

app.get("/:id",customerController.getCustomerById);

app.get("/name/:name",customerController.getCustomerByName);

app.post("/",auth, customerController.addCustomer);

app.put("/:id",auth,customerController.editCustomer);

app.patch("/:id",auth,customerController.addFavoriteDrinks);

app.delete("/:id",auth, customerController.deleteCustomer);

app.delete("/fd/:id/:idDrink",auth, customerController.deleteFavoriteDrinks);

module.exports = app;