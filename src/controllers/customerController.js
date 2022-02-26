const Customer = require('../models/customerModel');
exports.getCustomer = async (req, res) => {

    Customer.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getCustomerById = async (req, res) => {
    Customer.findById(req.params.id)   
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getCustomerByName = async (req, res) => {
    let customerName = req.params.name;
    Customer.find({  
            name: {
                $regex: new RegExp(customerName),
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

exports.addCustomer = async (req, res) => {
    try {
        let customer = new Customer({
            name: req.body.name,
            email : req.body.email,
            tel_phone : req.body.tel_phone,
            // favoriteDrinks : [
            //     {
            //         drinkName : req.body.favoriteDrinks[0].drinkName,
            //         drinkType : req.body.favoriteDrinks[0].drinkType,
            //     },
            // ],
        });
        req.body.favoriteDrinks.forEach((fd)=>{
            customer.favoriteDrinks.push(fd);
        });
        // customer.favoriteDrinks.push({
        //     drinkName: req.body.favoriteDrinks.drinkName,
        //     drinkType: req.body.favoriteDrinks.drinkType
        // });
        let createdCustomer = await customer.save();
        res.status(200).json({
            msg: "Add a Customer complete.",
            data: createdCustomer
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.editCustomer = async (req, res) => {
    let customer = {
        name: req.body.name,
        email : req.body.email,
        tel_phone : req.body.tel_phone
    };
    // req.body.favoriteDrinks.forEach((fd)=>{
    //     customer.favoriteDrinks.push(fd);
    // });
    Customer.findByIdAndUpdate(req.params.id, customer) 
        .exec((err, result) => {
            Customer.findById(req.params.id)
                .exec((err, result) => {
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

exports.addFavoriteDrinks = async (req, res) => {
    let favoriteDrink = {
        $push: {
            favoriteDrinks:[
                {
                    drinkName : req.body.drinkName,
                    drinkType : req.body.drinkType,
                }
            ]
        }
    };
    Customer.findByIdAndUpdate(req.params.id, favoriteDrink)
        .exec((err, result) => {
            Customer.findById(req.params.id)
                .exec((err, result) => {
                    // return doc ที่แก้ไขแล้วกลับไป
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

exports.deleteCustomer = async (req, res) => {
    Customer.findByIdAndDelete(req.params.id)     
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

exports.deleteFavoriteDrinks = async (req, res) => {
    Customer.findById(req.params.id)     
        .exec((err, result)=>{
            let customer = result
            console.log(customer.favoriteDrinks[0]);
            
            // for(var i in customer.favoriteDrinks){
            //     console.log(customer.favoriteDrinks[i]);
            // }
        });
    // console.log("ID CUST:" + req.params.id);
    // console.log("ID Drink:" + req.params.idDrink);
};
