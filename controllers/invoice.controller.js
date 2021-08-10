const Sequelize = require('sequelize');
const {sendNewSMS} = require('./sms.controller.js');
const {createNotification} = require('./notification.controller.js');
const Clients = require('../models/client.model.js');
const Invoices = require('../models/invoices.model.js');
const Bonus = require('../models/bonus.model.js');
const Classes = require('../models/class.model.js');
const Program = require('../models/program.model.js');
const Destinations = require('../models/destinations.model.js');
const User = require('../models/user.model.js');

exports.createInvoice = async (req, res) => {
    const {user_id, client_id, card_id, fname, lname, phone, boat_name, classe_name, for_kids, destination, session, departure_time, arriving_time} = req.body;

    if (!card_id || !fname || !lname || !phone || !boat_name || !classe_name || !destination || !departure_time || !arriving_time) throw res.status(400).json('fill all fields before to continue');
    
    let classFound = {} = JSON.parse(JSON.stringify(await Classes.findOne({where: {class_name: classe_name, session}})));
    
    if(classFound) {
        const invoice_code = Math.floor(Math.random() * 100000000);
        Invoices.create({
            printed: false,
            user_id,
            client_id,
            card_id,
            fname,
            lname,
            phone,
            boat_name,
            class_name: classe_name,
            price: for_kids ? classFound.kids_price : classFound.price,
            destination,
            departure_time,
            arriving_time,
            for_kids,
            session,
            verification_code: invoice_code,
            verified: false
        })
        .then((invoice) => {
            res.status(201).json({msg: 'successfully created!', invoice});
            // update count value
            Clients.update({
                invoice_count: Sequelize.literal('invoice_count + 1'),
                invoice_total: Sequelize.literal('invoice_total + 1')
            }, {
                where: {id: client_id}
            })
            .then(async () => {
                let _clients = [] = JSON.parse(JSON.stringify(await Clients.findAll()));
                let _invoices = [] = JSON.parse(JSON.stringify(await Invoices.findAll()));

                const client_data = _clients.filter((item, index, self) => index === self.findIndex(cli => cli.id === item.id) && item.id === client_id).shift();

                const bonus_count = _invoices.filter((item) =>
                    item.for_kids === Boolean(for_kids) && item.client_id === client_id && item.class_name === classe_name
                );

                if (bonus_count.length > 0 && bonus_count.length % 5 === 0) {
                    // creating a verification code for SMS
                    const verification_code = Math.floor(Math.random() * 1000000);

                    try {
                        Bonus.create({
                            printed: false,
                            client_id: client_data.id,
                            card_id: client_data.card_id,
                            fname: client_data.fname,
                            lname: client_data.lname,
                            phone: client_data.phone,
                            class_name: classe_name,
                            for_kids,
                            verification_code,
                            verified: false
                        })
                        .then(async (bonus) => {
                            const current_invoice = {} = JSON.parse(JSON.stringify(bonus));

                            const notificationContent = {
                                user_id,
                                content_id: current_invoice.id,
                                username: `${client_data.fname} ${client_data.lname}`,
                                title: 'bonus',
                                content: `a reçu un Bonus ${for_kids ? 'Enfant' : 'Adulte'} de ${classe_name}`
                            }

                            await sendNewSMS({
                                fname: client_data.fname,
                                lname: client_data.lname,
                                phone: client_data.phone,
                                classe_name,
                                for_kids,
                                verification_code
                            })
                            .then((feedback) => {
                                if (feedback.status === "sent") {
                                    console.log('sms sent: ', feedback.status);
                                    createNotification({...notificationContent, isSent: true});
                                }
                            })
                            .catch(error => {
                                if (error.code === 21614) {
                                    console.log(`${phone} can't receive SMS messages: ${error.message}`);
                                    createNotification({...notificationContent, isSent: false});
                                }else{
                                    console.log('sms not sent: ', error.status);
                                    createNotification({...notificationContent, isSent: false});
                                }
                            })
                            .done();
                        })
                        .catch(err => {
                            console.log('something went wrong: ', err);
                        });
                    } catch (error) {
                        res.status(400).json(error)
                    }
                }

            })
        })
        .then(() => {
            User.update({
                sold_invoices: Sequelize.literal('sold_invoices + 1')
            }, {
                where: {
                    id: user_id
                }
            })
        })
        .catch(error => {
            res.status(400).json("something went wrong" + error);
            console.log(error);
        });
    }
}

exports.updateInvoice = (req, res) => {
    const {id} = req.params;
    const {printed, request, print_request} = req.body;

    try {
        if (request === true) {
            Invoices.update({
                request,
                printed: printed === true ? true : false
            }, {
                where: {
                    id
                }
            })
            .then((data) => res.status(200).json({msg: 'successfully', data}))
            .then(data => console.log("data: ", data))
        } else if (print_request != null || print_request != undefined) {
            Invoices.update({
                print_request,
                request
            }, {
                where: {
                    id
                }
            })
            .then(() => res.status(200).json('successfully updated!'));
        }
    } catch (error) {
        res.status(400).json('something went wrong ' + error);
    }
}

exports.InvoiceVerification = async (req, res) =>{
    const {verification_code} = req.body;

    try {
        const isInvoiceFound = await JSON.parse(JSON.stringify(await Invoices.findOne({where: {verification_code}})));
        if (!isInvoiceFound) throw res.status(404).json('code introuvable');
        if (isInvoiceFound.verified === true) throw res.status(404).json("code invalide");
        const {id} = isInvoiceFound

        Invoices.update({
            verified: true
        }, {
            where: {id}
        })
        res.status(200).json('code valide');
    } catch (error) {
        res.status(400).json('something went wrong ' + error);
    }
}

exports.deleteInvoice = (req, res) => {
    const {id} = req.params;

    Invoices.destroy({where: {id}})
        .then(() => res.status(200).json('successfully deleted!'))
        .catch(err => res.status(404).json('something went wrong ' + err));
}

exports.createProgram = async (req, res) => {
    const {boat_name, destination, date, departure_time, arriving_time} = req.body
    try {
        await Program.create({
            boat_name,
            date,
            destination,
            departure_time,
            arriving_time
        })
        res.status(201).json('successfully created!');
    } catch (error) {
        res.status(400).json({msg: 'something went wrong'+ error});
    }
}

exports.getProgram = async (req, res) => {
    const {boat_name} = req.body;
    try {
        const boatProgram = await Program.findAll({where: {boat_name}});
        if (!boatProgram) throw res.status(404).json(`${boat_name}, n'est pas programmé pour aujourd'hui`);
        res.status(200).json(boatProgram);
    } catch (error) {
        res.status(400).json({msg: 'something went wrong'+ error});
    }
}

exports.getAllPrograms = async (req, res) => {
    try {
        const boatProgram = await Program.findAll();
        res.status(200).json(boatProgram);
    } catch (error) {
        res.status(400).json({msg: 'something went wrong'+ error});
    }
}

exports.getAllDestinations = async (req, res) => {
    try {
        const allDestinations = await Destinations.findAll();
        res.status(200).json(allDestinations);
    } catch (error) {
        res.status(404).json("something went wrong " + error);
    }
}

exports.createClass = async (req, res) => {
    const {classe_name, price_adult, price_child, capacity, session} = req.body;
    try {
        if (!classe_name || !price_adult || !price_child || !session) throw res.status(400).json('fill all the fields before to continue');
        const classExist = await Classes.findOne({where: {class_name: classe_name, session}});
        if (classExist) throw res.status(400).json('class already exist!');
        await Classes.create({
            class_name: classe_name,
            price: price_adult,
            kids_price: price_child,
            capacity,
            session
        })
        res.status(201).json('successfully created!');
    } catch (error) {
        res.status(400).json('something went wrong: ' + error);
    }
}

exports.getAllClasses = async (req, res) => {
    try {
        const allClasses = await Classes.findAll();
        res.status(200).json(allClasses);
    } catch (error) {
        res.status(404).json("something went wrong " + error);
    }
}

exports.updateClass = async (req, res) => {
    const {id} = req.params;
    const {classe_name, price_adult, price_child, capacity, session} = req.body;
    
    if (!classe_name || !price_adult || !price_child || !session) throw res.status(400).json('fill all the fields before to continue');
    const classExist = await Classes.findOne({where: {class_name: classe_name, session}});
    if (!classExist) throw res.status(400).json("class doesn't exist!");
    await Classes.update({
        class_name: classe_name,
        price: price_adult,
        kids_price: price_child,
        capacity,
        session
    }, {
        where: {id}
    })
    .then(() => res.status(201).json('successfully updated!'))
    .catch(error => res.status(400).json('something went wrong: ' + error));
}

exports.deleteClass = (req, res) => {
    const {id} = req.params;
    try {
        Classes.destroy({
            where: {id}
        })
        res.status(200).json('successfully deleted!')
    } catch (error) {
        res.status(404).json('someting went wrong: ' + error);
    }
}

exports.getAllInvoices = async (req, res) => {
    try {
        const invoice = await Invoices.findAll();
        res.status(200).json(invoice);
    } catch (error) {
        res.status(404).json("something went wrong "+error);
    }
}

exports.deleteProgram = (req, res) => {
    const {id} = req.params;
    Program.destroy({
        where: {id}
    })
    .then(() => res.status(200).json('successfully deleted!'))
    .catch(err => res.status(404).json('something went wrong ' + err));
}