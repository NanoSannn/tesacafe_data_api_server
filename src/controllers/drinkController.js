const Drink = require('../models/drinkModel');
exports.getDrink = async (req, res) => {

    Drink.find() 
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getDrinkById = async (req, res) => {
    Drink.findById(req.params.id) 
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getDrinkByName = async (req, res) => {
    let drinkName = req.params.name;
    Drink.find({ 
            name: {
                $regex: new RegExp(drinkName),
                $options: 'i'
            }
        })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.addDrink = async (req, res) => {
    try {
        let drink = new Drink({
            name : req.body.name,
            // drinkType : [
            //     {
            //         type : req.body.type,
            //         price : req.body.price,
            //     },
            // ]
        });
        req.body.drinkType.forEach((dt)=>{
            drink.drinkType.push(dt);
        });
        let createdDrink = await drink.save();
        res.status(200).json({
            msg: "Add a Drink complete.",
            data: createdDrink
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.editDrink = async (req, res) => {
    let drink = {
        name : req.body.name,
        // drinkType : [
        //     {
        //         type : req.body.type,
        //         price : req.body.price,
        //     },
        // ]
    };
    req.body.drinkType.forEach((dt)=>{
        drink.drinkType.push(dt);
    });
    Drink.findByIdAndUpdate(req.params.id, drink) 
        .exec((err, result) => {
            Drink.findById(req.params.id)
                .exec((err, result) => {
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

exports.deleteDrink = async (req, res) => {
    Drink.findByIdAndDelete(req.params.id)        
        .exec((err)=>{
            if(err){
                res.status(500).json({
                    msg: err
                });
            } else{
                res.status(200).json({
                    msg: "Delete complete"
                });
            }
        });
};