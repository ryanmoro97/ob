const getTaxonomyValues = (Model) => async (req, res) => {
    try {
        const taxonomyValues = await Model.findAll({
        attributes: ['taxonomyId', 'value']
        });
  
        res.send(taxonomyValues);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
};

module.exports = getTaxonomyValues;
  