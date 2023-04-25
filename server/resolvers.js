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

const constructWhereClause = (filters, vendortable = false) => {
  let whereClause = {};
  if (filters.brandFilter && !vendortable) {
    whereClause = { ...whereClause, '$product_brand->taxonomy_brand.value$': filters.brandFilter };
  }
  else if (filters.brandFilter && vendortable) {
    whereClause = { ...whereClause, '$brand$': filters.brandFilter };
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
  if (filters.modelIDFilter) { // matches beginning onwards
    whereClause = { ...whereClause, model_id: { [Op.iLike]: `${filters.modelIDFilter}%` }};
  } 
  if (filters.skuFilter) { // matches beginning onwards
    whereClause = { ...whereClause, sku: { [Op.iLike]: `${filters.skuFilter}%` }};
  }
  if (filters.barcodeFilter) {
    whereClause = { ...whereClause, '$product_UPC.value$': { [Op.iLike]: `%${filters.barcodeFilter}%` }}; // or EAN
  }
  // if (filters.partNumFilter) {
  //   whereClause = { ...whereClause, '$product_VPN.value$': { [Op.iLike]: `%${filters.partNumFilter}%` }};
  // }
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
              attributes: ['taxonomy_id', 'value']
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
        
        const whereClause = constructWhereClause(filters, vendortable = true);
        try {
          const modelNames = Object.keys(db.models);
          const vendorTable = await TaxonomyVendorTable.findOne({ where: { taxonomy_id: table }});
          const products = await db.model(vendorTable.value).findAll({where: whereClause});
          return products;
        }
        catch (error) {
          console.error(error);
          throw error;
        }
      },

      
      
    },
  Mutation: {
    insertVendorProducts: async (_, { products, vendorID, sub_category }) => {
      console.log('insertVendorProducts', products, vendorID, sub_category);

      try {
        // get sub_category id
        const sub_category = await TaxonomySubCategory.findOne({ where: { value: sub_category } });
        if (!sub_category) {
          throw new Error(`Sub Category: '${sub_category}' not found`);
        }
        const sub_category_id = sub_category.taxonomy_id;

        // insert products one at a time to avoid total insert failure on validation error
        const createdProducts = [];
        for (const product of products) {
          try {
            await sequelize.transaction(async (t) => {
              // insert product and get id for attribute insertions
              const productInstance = await Product.create(
                { description: product.description },
                { transaction: t }
              );
              createdProducts.push(productInstance);
              const product_id = productInstance.product_id;
            
              // brand value from vendor table is Value, need id for ProductBrand table insertion
              const taxonomyBrand = await TaxonomyBrand.findOne({ where: { value: product.brand } });
              if (!taxonomyBrand) {
                throw new Error(`Brand: '${product.brand}' not found`);
              }
              const brand_id = taxonomyBrand.taxonomy_id;
              
              // insert product attributes with product_id foreign key
              const attributePromises = [
                { model: ProductBrand, data: { product_id, brand: brand_id } },
                { model: ProductUPC, data: { product_id, value: product.upc } },
                { model: ProductMSRP, data: { product_id, value: product.msrp } },
                { model: ProductSize, data: { product_id, value: product.size } },
                { model: ProductColor, data: { product_id, value: product.color } },
                { model: ProductSpeed, data: { product_id, value: product.speed } },
              ]
                .filter(attribute => attribute.data.value !== null)
                .map(attribute => attribute.model.create(attribute.data, { transaction: t }));
              
              await Promise.all(attributePromises);
              
              // need to build product vendor table
              // await ProductVendor.create({
              //   product_id: product_id,
              //   vendor: product.vendor,
              // });
              // need to build subcat, cat references to subcategory
              // await ProductSubCategory.create({
              //   product_id: product_id,
              //   sub_category: subCategoryID,
              // });
              // await ProductCategory.create({
              //   product_id: product_id,
              //   category: subCategory.taxonomy_category_id,
              // });
            });
            console.log('Inserted ProductBrand:', productBrandInstance);

          } catch (error) {
            console.log(`Error inserting product with ID ${product.product_id}:`, error.message);
          }
        }
        
        return "Success";
      } catch (error) {
        console.error('insertVendorItems', error);
        throw new Error("Error inserting vendor items");
      }
      return "Success";
    },
  }
}
    
    module.exports = resolvers;

