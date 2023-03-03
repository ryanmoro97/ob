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
        SELECT p.id, tb.value AS brand, tc.value AS cat, tsc.value AS subcat, p.description, p.sku, u.value AS upc, m.value AS msrp, s.value AS size, co.value AS color, sp.value AS speed
        FROM product p
        LEFT JOIN product_brand b ON p.id = b.id
        LEFT JOIN taxonomy_brand tb ON b.value = tb.id
        LEFT JOIN product_cat c ON p.id = c.id
        LEFT JOIN taxonomy_cat tc ON c.value = tc.id
        LEFT JOIN product_sub_cat sc ON p.id = sc.id
        LEFT JOIN taxonomy_sub_cat tsc ON sc.value = tsc.id
        LEFT JOIN product_upc u ON p.id = u.id
        LEFT JOIN product_msrp m ON p.id = m.id
        LEFT JOIN product_size s ON p.id = s.id
        LEFT JOIN product_color co ON p.id = co.id
        LEFT JOIN product_speed sp ON p.id = sp.id;
    `, 
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