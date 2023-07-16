const express = require('express');
const cors = require('cors');
const Records = require('./records.json');

const app = express();
const port = 3004;

app.use(cors());

app.get('/api/medications', (req, res) => {
  res.json(Records);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
