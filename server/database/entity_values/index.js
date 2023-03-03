const Products = require('./products');
const product_UPC = require('./product_upc');
const product_MSRP = require('./product_msrp');
const product_brand = require('./product_brand');
const product_sub_cat = require('./product_sub_cat');
const product_cat = require('./product_cat');
const product_color = require('./product_color');
const product_size = require('./product_size');
const product_speed = require('./product_speed');

module.exports = {
    Products,
    product_brand,
    product_cat,
    product_sub_cat,
    product_UPC,
    product_MSRP,
    product_color,
    product_speed,
    product_size
};
