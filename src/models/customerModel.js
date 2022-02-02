const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    name : String,
    email : String,
    tel_phone : String,
    favoriteDrinks : [
        {
            drinkName : String,
            drinkType : String
        }
    ]
},
{ 
    timestamps: true       
});
module.exports = mongoose.model("Customer", customerSchema);