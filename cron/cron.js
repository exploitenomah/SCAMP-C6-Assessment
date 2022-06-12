

const schedule = require('node-schedule')

module.exports.dailyAt8Job = (cronJob) => schedule.scheduleJob('dailyAt8Job', '0 8 * * *', async () => {
  console.log('sent')
  await cronJob()
})

