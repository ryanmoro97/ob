const db = require('./db');
const { DataTypes } = require('sequelize');
const {CreateTaxonomyTable, CreateProductTable, CreateAttributeTable } = require('./models')

// TAXONOMY
const TaxonomyBrand = CreateTaxonomyTable('taxonomy_brand');
const TaxonomyCategory = CreateTaxonomyTable('taxonomy_category');
const TaxonomySubCategory = CreateTaxonomyTable('taxonomy_sub_category');
const TaxonomyVendor = CreateTaxonomyTable('taxonomy_vendor');

// MAIN PRODUCT TABLE
const Product = CreateProductTable();

// CORE ATTRIBUTES
const ProductBrand = CreateAttributeTable('product_brand', DataTypes.INTEGER);
const ProductCategory = CreateAttributeTable('product_category', DataTypes.INTEGER);
const ProductSubCategory = CreateAttributeTable('product_sub_category', DataTypes.INTEGER);
const ProductUPC = CreateAttributeTable('product_UPC', DataTypes.TEXT)
const ProductMSRP = CreateAttributeTable('product_MSRP', DataTypes.DECIMAL(10, 2));

// EXTRA ATTRIBUTES
const ProductSize = CreateAttributeTable('product_size', DataTypes.TEXT);
const ProductColor = CreateAttributeTable('product_color', DataTypes.TEXT);
const ProductSpeed = CreateAttributeTable('product_speed', DataTypes.TEXT);

// taxonomy relationships
ProductBrand.belongsTo(TaxonomyBrand, { foreignKey: 'value', targetKey: 'taxonomyId' });
TaxonomyBrand.hasMany(ProductBrand, { foreignKey: 'value', sourceKey: 'taxonomyId' });

ProductCategory.belongsTo(TaxonomyCategory, { foreignKey: 'value', targetKey: 'taxonomyId' });
TaxonomyCategory.hasMany(ProductCategory, { foreignKey: 'value', sourceKey: 'taxonomyId' });

ProductSubCategory.belongsTo(TaxonomySubCategory, { foreignKey: 'value', targetKey: 'taxonomyId' });
TaxonomySubCategory.hasMany(ProductSubCategory, { foreignKey: 'value', sourceKey: 'taxonomyId' });

// Product relationships
Product.hasOne(ProductBrand);
ProductBrand.belongsTo(Product);
Product.hasOne(ProductCategory);
ProductCategory.belongsTo(Product);
Product.hasOne(ProductSubCategory);
ProductSubCategory.belongsTo(Product);

Product.hasOne(ProductUPC);
ProductUPC.belongsTo(Product);
Product.hasOne(ProductMSRP);
ProductMSRP.belongsTo(Product);
Product.hasOne(ProductSize); // many?
ProductSize.belongsTo(Product);
Product.hasMany(ProductColor);
ProductColor.belongsTo(Product);
Product.hasOne(ProductSpeed); // many?
ProductSpeed.belongsTo(Product);
  
const createTables = async () => {
    try {
        await db.authenticate();
        await TaxonomyBrand.sync();
        await TaxonomyCategory.sync();
        await TaxonomySubCategory.sync();
        await TaxonomyVendor.sync();
        await Product.sync();
        await ProductUPC.sync();
        await ProductBrand.sync();
        await ProductCategory.sync();
        await ProductSubCategory.sync();
        await ProductMSRP.sync();
        await ProductSize.sync();
        await ProductColor.sync();
        await ProductSpeed.sync();
        await db.sync();
    } catch (error) {
        console.error('Unable to create tables:', error);
    }
};


module.exports = {
    createTables,
    TaxonomyBrand,
    TaxonomyCategory,
    TaxonomySubCategory,
    TaxonomyVendor,
    Product,
    ProductUPC,
    ProductBrand,
    ProductCategory,
    ProductSubCategory,
    ProductMSRP,
    ProductSize,
    ProductColor,
    ProductSpeed
};
  

