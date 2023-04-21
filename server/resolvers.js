// const getTaxonomyValues = require('./routes/taxonomyValues');
const { Op } = require('sequelize');
const db = require('./database/db');
const { 
    TaxonomyBrand, 
    TaxonomyCategory, 
    TaxonomySubCategory,
    TaxonomyVendor,
    TaxonomyVendorTable,
    Product, 
    ProductBrand, 
    ProductCategory, 
    ProductSubCategory, 
    ProductUPC, 
    ProductMSRP, 
    ProductSize, 
    ProductColor, 
    ProductSpeed, 
} = require('./database/create-tables');

const TAXONOMY_MODELS = {
  taxonomy_brand: TaxonomyBrand,
  taxonomy_cat: TaxonomyCategory,
  taxonomy_sub_cat: TaxonomySubCategory,
  taxonomy_vendor: TaxonomyVendor,
};

const constructWhereClause = (filters) => {
  let whereClause = {};
  if (filters.brandFilter) {
    whereClause = { ...whereClause, '$product_brand->taxonomy_brand.value$': filters.brandFilter };
  }
  if (filters.categoryFilter) {
    whereClause = { ...whereClause, '$product_category->taxonomy_category.value$': filters.categoryFilter };
  }
  if (filters.subCategoryFilter) {
    whereClause = { ...whereClause, '$product_sub_category->taxonomy_sub_category.value$': filters.subCategoryFilter };
  }
  if (filters.descriptionFilter) {
    whereClause = { ...whereClause, description: { [Op.iLike]: `%${filters.descriptionFilter}%` }};
  }
  if (filters.modelIdFilter) { // matches beginning onwards
    whereClause = { ...whereClause, model_id: { [Op.iLike]: `${filters.modelIdFilter}%` }};
  } 
  if (filters.skuFilter) {
    whereClause = { ...whereClause, sku: { [Op.iLike]: `${filters.skuFilter}%` }};
  }
  if (filters.upcFilter) {
    whereClause = { ...whereClause, '$product_UPC.value$': { [Op.iLike]: `%${filters.upcFilter}%` }};
  }
  if (filters.sizeFilter) {
    whereClause = { ...whereClause, '$product_size.value$': { [Op.iLike]: `%${filters.sizeFilter}%` }};
  }
  return whereClause;
}


const resolvers = {
    Query: {
        getTaxonomyValues: async (_, { taxonomyClass }) => {
            const TaxonomyModel = TAXONOMY_MODELS[taxonomyClass];
            if (!TaxonomyModel) {
                throw new Error(`Invalid taxonomy type: ${taxonomyClass}`);
            }

            const taxonomyValues = await TaxonomyModel.findAll({
                attributes: ['taxonomyId', 'value']
            });
            return taxonomyValues
        },

        getProductsValues: async (_, { filters }) => {
            const whereClause = constructWhereClause(filters);
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

                const productsWithAttributes = products.map(product => {
                    const { product_brand, product_category, product_sub_category,
                        product_UPC, product_MSRP, product_size, product_color, product_speed,
                        ...productData
                    } = product.toJSON();
                    return {
                        ...productData,
                        brand: product_brand.taxonomy_brand.value,
                        category: product_category.taxonomy_category.value,
                        subCategory: product_sub_category.taxonomy_sub_category.value,
                        upc: product_UPC?.value,
                        msrp: product_MSRP?.value,
                        size: product_size?.value,
                        color: product_color?.value,
                        speed: product_speed?.value,    
                    };
                });
                  

                return productsWithAttributes;
            } catch (error) {
              console.error(error);
              throw error;
            }
        },

        getVendorProductsValues: async (_, { table, filters }) => {
          
          const whereClause = constructWhereClause(filters);
          try {
            const modelNames = Object.keys(db.models);
            console.log(modelNames); // output the list of model names

            const vendorTable = await TaxonomyVendorTable.findOne({ where: { taxonomyId: table }});
            const products = await db.model("product_trek").findAll({where: whereClause});
            console.log(products[1].color);
            return products;
          }
          catch (error) {
            console.error(error);
            throw error;
          }
        },

    },
}

module.exports = resolvers;

