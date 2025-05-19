const express = require('express');
const cors = require('cors');
const { getNAVData } = require('./database');

const app = express();
app.use(cors());

app.get('/api/nav-history', async (req, res) => {
  const data = await getNAVData();
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});