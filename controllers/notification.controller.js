const Notifications = require('../models/notification.model.js');
const Bonus = require('../models/bonus.model.js');
const {sendNewSMS} = require('./sms.controller.js');

exports.createNotification = (notificationContent) => {
    const {user_id, content_id, username, title, content, isSent} = notificationContent;
    Notifications.create({
        user_id,
        content_id,
        username,
        title,
        content,
        isSent
    })
}

exports.getAllNotifications = async (req, res) => {
    try {
        const notification = await Notifications.findAll();
        res.status(200).json({notification});
    } catch (error) {
        res.status(400).json('something went wrong ' + error);
    }
}

exports.updateNotification = async (req, res) => {
    const {id} = req.params;
    const {isSent, content_id, title} = req.body;

    const current_bonus = JSON.parse(JSON.stringify(await Bonus.findOne({where: {id: content_id}})));
    if (title === "bonus" && current_bonus) {
        if (isSent === false) {
            await sendNewSMS({
                fname: current_bonus.fname,
                lname: current_bonus.lname,
                phone: current_bonus.phone,
                classe_name: current_bonus.class_name,
                for_kids: current_bonus.for_kids,
                verification_code: current_bonus.verification_code
            })
            .then((feedback) => {
                if (feedback.status === "sent") {
                    Notifications.update({
                        isSent: true
                    }, {
                        where: {id}
                    })
                    .then(() => res.status(201).json('successfully updated!'))    
                    .catch(err => res.status(400).json('something went wrong ' + err));
                } else {
                    res.status(400).json('something went wrong ' + error);
                }
            })
            .catch(error => {
                if (error.code === 21614) {
                    console.log(`${phone} can't receive SMS messages: ${error.message}`);
                }else{
                    console.log('sms not sent: ', error.status);
                }
            })
            .done();
        }
    } else {
        res.status(400).json('something went wrong');
    }
}