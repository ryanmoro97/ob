const { Product, ProductBrand, ProductCategory, ProductSubCategory, ProductUPC, ProductMSRP, ProductSize, ProductColor, ProductSpeed, TaxonomyBrand, TaxonomyCategory, TaxonomySubCategory } = require('../database/create-tables');

const getProductsValues = async (req, res) => {
    const filters = req.query || {};
    // const limit = 10;
    // console.log("FILTER: ", filters.brandFilter.value);

    // TODO Change filters to use taxonomyID instead of value as its passed in req.query
    let whereClause = {};
    if (filters.brandFilter) {
      whereClause = { ...whereClause, '$product_brand->taxonomy_brand.value$': filters.brandFilter.value };
    }
    if (filters.categoryFilter) {
      whereClause = { ...whereClause, '$product_category->taxonomy_category.value$': filters.categoryFilter.value };
    }
    if (filters.subCategoryFilter) {
      whereClause = { ...whereClause, '$product_sub_category->taxonomy_sub_category.value$': filters.subCategoryFilter.value };
    }
    //, where: {value: {[Op.like]: `${'filters.upcFilter.value'}%`}}
  
    try {
        const products = await Product.findAll({
            include: [
            { model: ProductBrand, include: [{ model: TaxonomyBrand, attributes: ['value'] }] },
            { model: ProductCategory, include: [{ model: TaxonomyCategory, attributes: ['value'] }]},
            { model: ProductSubCategory, include: [{ model: TaxonomySubCategory, attributes: ['value'] }] },
            { model: ProductUPC, attributes: ['value'] }, 
            { model: ProductMSRP, attributes: ['value'] },
            { model: ProductSize, attributes: ['value'] }, 
            { model: ProductColor, attributes: ['value'] }, 
            { model: ProductSpeed, attributes: ['value'] }, 
            ],
            where: whereClause,
        });
    
        res.send(products);
    } catch (err) {
        console.error(err);
          res.status(500).send(`Error fetching data: ${err.message}`);
    }
};

module.exports = getProductsValues;