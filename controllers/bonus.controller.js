const Bonus = require("../models/bonus.model.js");

exports.bonusVerification = async (req, res) => {
    const {verification_code} = req.body;
    try {
        const isBonusFound = await JSON.parse(JSON.stringify(await Bonus.findOne({where: {verification_code}})));
        if (!verification_code) throw res.status(400).json('Entrez le Code Vérification');
        if (!isBonusFound) throw res.status(404).json('Pas de Résultats');
        if (isBonusFound.verified === true) throw res.status(404).json("ce code n'est plus valide");

        res.status(200).json(isBonusFound);
    } catch (error) {
        res.status(400).json('something went wrong: '+error);
    }
}

exports.updateBonus = (req, res) => {
    const {id} = req.params;
    const {client_id, card_id, fname, lname, phone, boat_name, classe_name, destination, departure_time, arriving_time} = req.body;
    
    try {
        Bonus.update({
            printed: true,
            verified: true,
            client_id,
            card_id,
            fname,
            lname,
            phone,
            boat_name,
            class_name: classe_name,
            destination,
            departure_time,
            arriving_time
        }, {
            where: {id}
        })
        res.status(200).json('invoice successfully updated!');
    } catch (error) {
        res.status(400).json('something went wrong: ' + error);
    }
}

exports.getAllBonus = async (req, res) => {
    try {
        const bonus = await Bonus.findAll();
        res.status(200).json(bonus);
    } catch (error) {
        res.status(400).json('something went wrong: '+error);
    }
}