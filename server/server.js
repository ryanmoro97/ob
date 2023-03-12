const express = require('express');
const cors = require('cors');
const app = express();
const port = 6969; //process.env.PORT
const { TaxonomyBrand, TaxonomyCategory, TaxonomySubCategory, TaxonomyVendor } = require('./database/create-tables');
const { Op, where } = require('sequelize');

const getTaxonomyValues = require('./routes/taxonomyValues');
const getProductsValues = require('./routes/productValues');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/products', getProductsValues);

app.get('/api/taxonomy_cat', getTaxonomyValues(TaxonomyCategory));
app.get('/api/taxonomy_brand', getTaxonomyValues(TaxonomyBrand));
app.get('/api/taxonomy_sub_cat', getTaxonomyValues(TaxonomySubCategory));
app.get('/api/taxonomy_vendor', getTaxonomyValues(TaxonomyVendor));

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