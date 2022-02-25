const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const salesSchema = new Schema({
    name : String,
    email : String,
    tel_phone : String,
    items : [
        {
            drinkName : String,
            drinkType : String,
            price : Number,
        },
    ],
},
{ 
    timestamps: true       
});
module.exports = mongoose.model("Sales", salesSchema);