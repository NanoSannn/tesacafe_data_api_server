const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const drinkSchema = new Schema({
    name : String,
    drinkType : [
        {
            drinkTy : String,
            price : Number,
        },
    ]
},
{ 
    timestamps: true       
});
module.exports = mongoose.model("Drink", drinkSchema);