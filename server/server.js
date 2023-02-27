const express = require('express');
const cors = require('cors');
const pool = require('./database/db');
const app = express();
const port = 5432; //process.env.PORT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/products', (req, res) => {
    pool.query('SELECT * FROM product', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
      } else {
        res.send(result.rows);
      }
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
