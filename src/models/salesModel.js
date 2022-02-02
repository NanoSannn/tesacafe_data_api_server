const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const salesSchema = new Schema({
    customer : 
        {
            name : String,
            email : String,
            tel_phone : String,
        },
    
    items : [
        {
            name : String,
            drinkType : String,
            price : Number,
        },
    ],
},
{ 
    timestamps: true       
});
module.exports = mongoose.model("Sales", salesSchema);