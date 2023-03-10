const express = require('express');
const cors = require('cors');
// const pool = require('./database/db');
const app = express();
const port = 6969; //process.env.PORT
const { TaxonomyBrand, TaxonomyCategory, TaxonomySubCategory, TaxonomyVendor, Product, ProductUPC, ProductMSRP, ProductBrand, ProductCategory, ProductSubCategory, ProductSize, ProductColor, ProductSpeed } = require('./database/create-tables');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {model: ProductBrand, include: [{model: TaxonomyBrand, attributes: ['value']}]},
        {model: ProductCategory, include: [{model: TaxonomyCategory, attributes: ['value']}]},
        {model: ProductSubCategory, include: [{model: TaxonomySubCategory, attributes: ['value']}]},
        {model: ProductUPC, attributes: ['value']},
        {model: ProductMSRP, attributes: ['value']},
        {model: ProductSize, attributes: ['value']},
        {model: ProductColor, attributes: ['value']},
        {model: ProductSpeed, attributes: ['value']},
      ]
    });
    res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error fetching data: ${err.message}`);
  }
});


app.get('/api/taxonomy_brand', async (req, res) => {
  try {
    const taxonomyValues = await TaxonomyBrand.findAll({
      attributes: ['taxonomyId', 'value']
    });

    res.send(taxonomyValues);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/taxonomy_cat', async (req, res) => {
  try {
    const taxonomyValues = await TaxonomyCategory.findAll({
      attributes: ['taxonomyId', 'value']
    });

    res.send(taxonomyValues);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/taxonomy_sub_cat', async (req, res) => {
  try {
    const taxonomyValues = await TaxonomySubCategory.findAll({
      attributes: ['taxonomyId', 'value']
    });

    res.send(taxonomyValues);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/taxonomy_vendor', async (req, res) => {
  try {
    const taxonomyValues = await TaxonomyVendor.findAll({
      attributes: ['taxonomyId', 'value']
    });

    res.send(taxonomyValues);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
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