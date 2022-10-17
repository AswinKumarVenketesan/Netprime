const cron =  require('node-cron');
const fs =  require('fs');

cron.schedule('* * * * *',() =>{
    console.log('--------------')
    console.log('Running cron Job')
    fs.unlink('../logs/netprime.log', err => {
        if(err) throw err;
        console.log('netprime winston log file successfully deleted')
    })
})


cron.schedule('* * * * *',() => {
    console.log('--------------')
    console.log('Running cron Job')
    fs.unlink('../logs/netprime-error.log', err => {
        if(err) throw err;
        console.log('netprime winston log file successfully deleted')
    })
})