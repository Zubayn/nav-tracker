const axios = require('axios');
const cheerio = require('cheerio');
const { insertNAVData } = require('./database');

async function fetchNAV() {
  try {
    const response = await axios.get('https://www.publicmutual.com.my/Fund-Price-UT');
    const $ = cheerio.load(response.data);

    $('table.fund-table tbody tr').each((index, element) => {
      const fundName = $(element).find('td.fund-name').text().trim();
      const nav = parseFloat($(element).find('td.nav').text().trim());
      const date = new Date().toISOString().split('T')[0];

      if (fundName && nav) {
        insertNAVData(fundName, nav, date);
      }
    });
  } catch (error) {
    console.error('Error fetching NAV data:', error);
  }
}

module.exports = fetchNAV;