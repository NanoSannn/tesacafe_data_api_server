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
            customer : 
                {
                    name : req.body.customer.name,
                    email : req.body.customer.email,
                    tel_phone : req.body.customer.tel_phone,
                },
            
            // tems : [
            //     {
            //         name : req.body.name,
            //         type : req.body.type,
            //         price : req.body.price,
            //     },
            // ],
        });
        req.body.items.forEach((t)=>{
            sales.items.push(t);
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
        customer : {
                name : req.body.customer.name,
                email : req.body.customer.email,
                tel_phone : req.body.customer.tel_phone,
        },
        
    };
    req.body.items.forEach((t)=>{
        sales.items.push(t);
    });
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