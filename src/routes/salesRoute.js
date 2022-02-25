const express = require('express');
const app = express.Router();
const salesController = require('../controllers/salesController')
const auth = require('../middleware/auth')

app.get("/", salesController.getSales);

app.get("/:id",salesController.getSalesById);

app.get("/name/:name",salesController.getSalesByName);

app.post("/",auth, salesController.addSales);

app.put("/:id",auth,salesController.editSales);

app.patch("/:id",auth,salesController.addItems);

app.delete("/:id",auth, salesController.deleteSales);

module.exports = app;