const getTaxonomyValues = require('./routes/taxonomyValues');
const { TaxonomyBrand, TaxonomyCategory, TaxonomySubCategory, TaxonomyVendor } = require('./database/create-tables');
  
const TAXONOMY_MODELS = {
  taxonomy_brand: TaxonomyBrand,
  taxonomy_cat: TaxonomyCategory,
  taxonomy_sub_cat: TaxonomySubCategory,
  taxonomy_vendor: TaxonomyVendor,
};

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
    },
};

module.exports = resolvers;
