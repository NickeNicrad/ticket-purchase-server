const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model.js');
const User = require('../models/user.model.js');

exports.userLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) throw res.status(400).json('please fill all fields before to continue');
        const user = await User.findOne({where: {email}});
        if (!user || user === null || user === undefined || user === "") throw res.status(401).json('incorrect email');
        const {id, active} = user;
        if(active === false) throw res.status(403).json('account deactivated!');
        if (await bcrypt.compare(password, user.password)) {
            const token = await jwt.sign({id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            const cookieOptions = await {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000),
                httpOnly: true
            }
            res.status(200).json({user, token, cookieOptions});
        } else {
            res.status(401).json('incorrect email or password');
        }
    } catch (error) {
        res.status(520).json("something went wrong" + error);
    }
}

exports.adminLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) throw res.status(400).json('please fill all fields before to continue');
        const admin = await Admin.findOne({where: {email}});
        if (!admin || admin === null || admin === undefined || admin === "") throw res.status(403).json('incorrect email');
        const {id} = admin;
        if (await bcrypt.compare(password, admin.password)) {
            const token = await jwt.sign({id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            const cookieOptions = await {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000),
                httpOnly: true
            }
            res.status(200).json({admin, token, cookieOptions});
        } else {
            res.status(403).json('incorrect email or password');
        }
    } catch (error) {
        res.status(520).json("something went wrong" + error);
    }
}

exports.getUser = async (req, res) => {
    const id = req.user.id;
    try {
        const user = await User.findOne({where: {id}});
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json('something went wrong', error);
    }
}

exports.getAdmin = async (req, res) => {
    const id = req.user.id;
    try {
        const admin = await Admin.findOne({where: {id}});
        res.status(200).json(admin);
    } catch (error) {
        res.status(401).json('something went wrong', error);
    }
}

// exports.register = async (req, res) => {
//     const admin = {
//         fname: 'system',
//         lname: 'admin',
//         email: 'admin@gmail.com',
//         password: '123456789',
//     }
//     try {
//         const hashedPass = await bcrypt.hash(admin.password, 10);
//         await Admin.create({
//             fname: admin.fname,
//             lname: admin.lname,
//             email: admin.email,
//             password: hashedPass, 
//             createdAt: Date.now,
//             updatedAt: Date.now
//         })
//         .then(() =>
//         {
//             res.status(200).json('admin successfully created')
//         })
//         .catch(err =>
//         {
//             res.status(409).json(err);
//         });
//     } catch (error) {
//         res.status(400).json(error);
//         console.log(error);
//     }
// }

