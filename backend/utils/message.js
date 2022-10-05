const moment = require('moment');

function formateMessage(username,text){
    return {
        username,text,time:moment().format('hh:mm a')
    }
}

module.exports={formateMessage}