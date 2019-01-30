const express = require('express');
const ctrlTelegram = require('../api/telegramMsg');

var router = express.Router([false,false,false]);

router = app =>{
    app.post('/', ctrlTelegram.sendMsg);
    /*app.post('/', (req,res) => {
        console.log(`req from /`);
        console.log(req.body);
        res.send({message:'what are u doing!?'});
    })*/
};

/*router.post('/telegram', ctrlTelegram.sendMsg);*/

module.exports = router;