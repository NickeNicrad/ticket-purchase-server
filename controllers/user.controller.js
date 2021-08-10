const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');
const Admin = require('../models/admin.model.js');

exports.createUser = async (req, res) => {
    const {fname, lname, email} = req.body;
    const password = '0000'
    try {
        if (!fname || !lname || !email) throw res.status(400).json('fill all the fields before to continue');
        if (await User.findOne({where: {email}})) throw res.status(400).json('user already exist');
        const hashed = await bcrypt.hash(password, 12);
        await User.create({
            fname,
            lname,
            email,
            active: false,
            password: hashed
        })
        res.status(201).json('user successfully created')
    } catch (error) {
        res.status(400).json('something went wrong: '+error)
    }
}

exports.getUsers = async (req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    }catch(error){
        res.status(404).json(error);
    }
}

exports.updateUserState = (req, res) => {
    const {id} = req.params;
    const {active} = req.body;

    try {
        if (active === null || active === undefined) throw res.status(400).json('no value defined');
        if (active === true) {
            User.update({
                active: false
            }, {
                where: {id}
            })
            .then(() => res.status(200).json('user successfully updated!'));
        } else
        {
            User.update({
            active: true
        }, {
            where: {id}
        })
        .then(() => res.status(200).json('user successfully updated!'));
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.updateUser = async (req, res) => {
    const {id} = req.params;
    const {fname, lname, email, phone, address, about} = req.body;

    try {
        if (!fname || !lname || !email) throw res.status(400).json('fill at least username and email');
        User.update({
            fname,
            lname,
            email,
            phone,
            address,
            about
        }, {
            where: {id}
        })
        .then(() => res.status(200).json('user successfully updated!'));
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.updatePassword = async (req, res) => {
    const {id} = req.params;
    const {currentpassword, newpassword, confirmpassword} = req.body;
    if (!currentpassword || !newpassword || !confirmpassword) throw res.status(400).json('fill all password fields before to continue!');
    if (newpassword !== confirmpassword) throw res.status(400).json('use the same password to confirm');
    const found = JSON.parse(JSON.stringify(await User.findAll({where: {id}})));
    const isPassCorrect = await bcrypt.compare(currentpassword, found[0].password.toString());
    if (isPassCorrect === false) throw res.status(403).json('incorrect password');
    const hashedPass = await bcrypt.hash(newpassword, 12)
    User.update({
        password: hashedPass
    }, {
        where: {id}
    })
    .then(() => res.status(200).json('password successfully updated!'))
    .catch(err => res.status(404).json(err));
    
}

exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    await User.destroy({
            where: {id}
    })
    .then(() => res.status(200).json('successfully deleted!'))
    .catch((err) => res.status(404).json('something went wrong: '+err));
}

// admin controller for only messages
exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne();
        res.status(200).json(admin);
    } catch (error) {
        res.status(404).json('something went wrong', error);
    }
}
