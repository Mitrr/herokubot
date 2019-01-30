var count = 0;
let no = 'не указан';
const admin = require('firebase-admin');
const account = require('./../adminsdk');
const fb = require('firebase');
const fs = require('firebase/firestore');

admin.initializeApp({
    credential: admin.credential.cert(account),
    databaseURL: "https://teiwaz-7c311.firebaseio.com",
    /*serviceAccountId:"firebase-adminsdk-tfyc7@teiwaz-7c311.iam.gserviceaccount.com"*/
});
const db = admin.firestore();

module.exports.sendMsg = (req, res) => {
    //токен и id чата берутся из config.json
    const config = require('../config/config.json');
    let httpReq = require('request');
    let reqBody = req.body;

    let date = new Date();
    let strDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;

    let fieldsStr = `Новая заявка id:${++count}\n`;
    for (let key in reqBody){
        fieldsStr += `<b>${key.toUpperCase()}</b>: ${req.param(key+"")} \n`
    }

    reqBody.date = strDate;
    console.log(reqBody);
    let docRef = db.collection('Landing-clients').doc(`${reqBody.name} ${count}`).set(reqBody);

    fieldsStr = encodeURI(fieldsStr);
    //telegram request
    httpReq.post(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${fieldsStr}`,
        function (error, response, body) {
        /*console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);*/
        if(response.statusCode===200){
            res.status(200).json({status: 'ok', message: 'Успешно отправлено!'});
        }
        if(response.statusCode!==200){
            res.status(400).json({status: 'error', message: 'Произошла ошибка!'});
        }
    });
};