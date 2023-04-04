const express = require('express');
const cors = require('cors');
const app = express();
const port = 6969; //process.env.PORT
// const { Op, where } = require('sequelize');
const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require('graphql-import');
const typeDefs = importSchema('./schema.graphql');
const resolvers = require("./resolvers");

const { TaxonomyBrand, TaxonomyCategory, TaxonomySubCategory, TaxonomyVendor } = require('./database/create-tables');
const getTaxonomyValues = require('./routes/taxonomyValues');
const getProductsValues = require('./routes/productValues');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a new Apollo server instance and mount it on the '/graphql' path
const server = new ApolloServer({ typeDefs, resolvers, graphiql: true });
server.start().then(() => {
  console.log('Server started');
  server.applyMiddleware({ app, path: '/graphql' });
});


app.listen(port, () => {
  console.log(`🚀🚀🚀 Server is listening on port ${port} 🚀🚀🚀`);
});


process.on('SIGINT', () => {
  console.log('Shutting down server gracefully');
  server.stop().then(() => {
    console.log('Server closed');
    process.exit(0);
  });
});


// app.get('/api/products', getProductsValues);

// app.get('/api/taxonomy_cat', getTaxonomyValues(TaxonomyCategory));
// app.get('/api/taxonomy_brand', getTaxonomyValues(TaxonomyBrand));
// app.get('/api/taxonomy_sub_cat', getTaxonomyValues(TaxonomySubCategory));
// app.get('/api/taxonomy_vendor', getTaxonomyValues(TaxonomyVendor));