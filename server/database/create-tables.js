const db = require('./db');
const { DataTypes } = require('sequelize');
const {CreateTaxonomyTable, CreateProductTable, CreateAttributeTable, CreateVendorProductTable } = require('./models')

// TAXONOMY
const TaxonomyBrand = CreateTaxonomyTable('taxonomy_brand');
const TaxonomyCategory = CreateTaxonomyTable('taxonomy_category');
const TaxonomySubCategory = CreateTaxonomyTable('taxonomy_sub_category');
const TaxonomyVendor = CreateTaxonomyTable('taxonomy_vendor');
const TaxonomyVendorTable = CreateTaxonomyTable('taxonomy_vendor_table');

// MAIN PRODUCT TABLE
const Product = CreateProductTable();

// CORE ATTRIBUTES
const ProductBrand = CreateAttributeTable('product_brand', DataTypes.INTEGER);
const ProductCategory = CreateAttributeTable('product_category', DataTypes.INTEGER);
const ProductSubCategory = CreateAttributeTable('product_sub_category', DataTypes.INTEGER);
const ProductUPC = CreateAttributeTable('product_UPC', DataTypes.TEXT, 12, true);
const ProductMSRP = CreateAttributeTable('product_MSRP', DataTypes.DECIMAL(10, 2));

// EXTRA ATTRIBUTES
const ProductSize = CreateAttributeTable('product_size', DataTypes.TEXT);
const ProductColor = CreateAttributeTable('product_color', DataTypes.ARRAY(DataTypes.TEXT),);
const ProductSpeed = CreateAttributeTable('product_speed', DataTypes.TEXT);

// VENDOR PRODUCT TABLES
const ProductTrek = CreateVendorProductTable('product_trek');

// taxonomy relationships
ProductBrand.belongsTo(TaxonomyBrand, { foreignKey: 'value', targetKey: 'taxonomy_id' });
TaxonomyBrand.hasMany(ProductBrand, { foreignKey: 'value', sourceKey: 'taxonomy_id' });

ProductCategory.belongsTo(TaxonomyCategory, { foreignKey: 'value', targetKey: 'taxonomy_id' });
TaxonomyCategory.hasMany(ProductCategory, { foreignKey: 'value', sourceKey: 'taxonomy_id' });

ProductSubCategory.belongsTo(TaxonomySubCategory, { foreignKey: 'value', targetKey: 'taxonomy_id' });
TaxonomySubCategory.hasMany(ProductSubCategory, { foreignKey: 'value', sourceKey: 'taxonomy_id' });

// Product relationships
// Product relationships
Product.hasOne(ProductBrand, { foreignKey: 'product_id' });
ProductBrand.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasOne(ProductCategory, { foreignKey: 'product_id' });
ProductCategory.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasOne(ProductSubCategory, { foreignKey: 'product_id' });
ProductSubCategory.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasOne(ProductUPC, { foreignKey: 'product_id' });
ProductUPC.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasOne(ProductMSRP, { foreignKey: 'product_id' });
ProductMSRP.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasOne(ProductSize, { foreignKey: 'product_id' }); 
ProductSize.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasOne(ProductColor, { foreignKey: 'product_id' });
ProductColor.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasOne(ProductSpeed, { foreignKey: 'product_id' }); 
ProductSpeed.belongsTo(Product, { foreignKey: 'product_id' });

  
const createTables = async () => {
    try {
        await db.authenticate();
        await TaxonomyBrand.sync();
        await TaxonomyCategory.sync();
        await TaxonomySubCategory.sync();
        await TaxonomyVendor.sync();
        await TaxonomyVendorTable.sync();
        await Product.sync();
        await ProductUPC.sync();
        await ProductBrand.sync();
        await ProductCategory.sync();
        await ProductSubCategory.sync();
        await ProductMSRP.sync();
        await ProductSize.sync();
        await ProductColor.sync();
        await ProductSpeed.sync();
        await ProductTrek.sync();
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
    TaxonomyVendorTable,
    Product,
    ProductUPC,
    ProductBrand,
    ProductCategory,
    ProductSubCategory,
    ProductMSRP,
    ProductSize,
    ProductColor,
    ProductSpeed,
    ProductTrek
};
  

