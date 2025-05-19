const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./navdata.db');

db.serialize(() => {
  db.run(\`
    CREATE TABLE IF NOT EXISTS nav_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fund_name TEXT,
      nav REAL,
      date TEXT
    )
  \`);
});

function insertNAVData(fundName, nav, date) {
  db.run(
    \`INSERT INTO nav_history (fund_name, nav, date) VALUES (?, ?, ?)\`,
    [fundName, nav, date]
  );
}

function getNAVData() {
  return new Promise((resolve, reject) => {
    db.all(\`SELECT * FROM nav_history ORDER BY date ASC\`, [], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

module.exports = { insertNAVData, getNAVData };