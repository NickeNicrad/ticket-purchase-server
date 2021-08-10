const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const clientSMS = require('twilio')(accountSid, authToken);

exports.sendNewSMS = (smsContent) => {
    const {fname, lname, classe_name, phone, for_kids, verification_code} = smsContent;
    
    return clientSMS.messages.create({
        body: `Félicitation! \n${fname} ${lname}, vous avez reçu un billet bonus de ${classe_name} pour ${for_kids ? 'Enfant' : 'Adulte'} de la part de l'Etablissement BMB pour votre prochain voyage. \ncode de vérification: ${verification_code}`,
        to: phone,
        from: process.env.SENDER_NUMBER
    })
    // .then((feedback) => {
    //     console.log("sms successfully sent", feedback.message);
    // })
    // .catch(error => {
    //     if (error.code === 21614) {
    //         console.log(`${phone} can't receive SMS messages: ${error.message}`);
    //     }else{
    //         console.log('sms not sent: ', error.message);
    //         error.message;
    //     }
    // })
    // .done();
}