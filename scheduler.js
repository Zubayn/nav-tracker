const cron = require('node-cron');
const fetchNAV = require('./scraper');

cron.schedule('0 18 * * *', () => {
  console.log('Fetching NAV data...');
  fetchNAV();
});