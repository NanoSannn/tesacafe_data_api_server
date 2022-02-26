const Sales = require('../models/salesModel');
exports.getSales = async (req, res) => {

    Sales.find() 
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getSalesById = async (req, res) => {
    Sales.findById(req.params.id) 
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getSalesByName = async (req, res) => {
    let salesName = req.params.name;
    Sales.find({ 
            name: {
                $regex: new RegExp(salesName),
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

exports.addSales = async (req, res) => {
    try {
        let sales = new Sales({
                    name : req.body.name,
                    email : req.body.email,
                    tel_phone : req.body.tel_phone,
            // tems : [
            //     {
            //         name : req.body.name,
            //         type : req.body.type,
            //         price : req.body.price,
            //     },
            // ],
        });
        let createdSales = await sales.save();
        res.status(200).json({
            msg: "Add a Sales complete.",
            data: createdSales
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.editSales = async (req, res) => {
    let sales = {
                name : req.body.name,
                email : req.body.email,
                tel_phone : req.body.tel_phone,
                
        
    };
    // req.body.items.forEach((t)=>{
    //     sales.items.push(t);
    // });
    Sales.findByIdAndUpdate(req.params.id, sales) 
        .exec((err, result) => {
            Sales.findById(req.params.id)
                .exec((err, result) => {
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

exports.addItems = async (req, res) => {
    let item = {
        $push: {
            items : [
                {
                    drinkName : req.body.items[0].drinkName,
                    drinkType : req.body.items[0].drinkType,
                    price : req.body.items[0].price,
                }
            ]
        }
    };
    Sales.findByIdAndUpdate(req.params.id, item)
        .exec((err, result) => {
            Sales.findById(req.params.id)
                .exec((err, result) => {
                    // return doc ที่แก้ไขแล้วกลับไป
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

exports.deleteSales = async (req, res) => {
    Sales.findByIdAndDelete(req.params.id)        
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

exports.deleteItems = async (req, res) => {
    Sales.findById(req.params.id)  
        .exec((err)=>{
            Sales.findByIdAndDelete(req.params.id)        
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
        });
};