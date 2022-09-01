const fs = require('fs');
const moment = require('moment');

const logs = {
    add: 'Добавление в корзину',
    change: 'Изменение в корзине',
    delp: 'Удалено из корзины',
};

let addLog = (log, cartLog) => {
    log.push(cartLog);
    return JSON.stringify(log, null, 4);
};

const writeLog = (req, res, action, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            //console.log(req.body);
            let mId = '-';
            if (req.params.id) { mId = req.params.id; }
            else if (req.body.id_product) { mId = req.body.id_product; }
            mId = String(mId);
            let cartLog = {
                Product_id: mId,
                Action: logs[action],
                Time: `${moment().format('MMMM Do YYYY, h:mm:ss a')}`
            };
            let newLog = addLog(JSON.parse(data), cartLog);
            fs.writeFile(file, newLog, (err) => {
                if (err) {
                    console.log('Error');
                }
            });
        }
    })
};
module.exports = writeLog;