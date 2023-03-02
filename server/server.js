const express = require('express');
const cors = require('cors');
const pool = require('./database/db');
const app = express();
const port = 6969; //process.env.PORT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/products', (req, res) => {
    pool.query(`
        SELECT p.id, p.description, p.sku, u.value AS upc, m.value AS msrp
        FROM product p
        LEFT JOIN upc u ON p.id = u.id
        LEFT JOIN msrp m ON p.id = m.id; 
    `, 
    // pool.query('SELECT * FROM product LEFT JOIN upc on product.id = upc.id',
    (err, result) => {
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

process.on('SIGINT', () => {
    console.log('Shutting down server gracefully');
    app.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });