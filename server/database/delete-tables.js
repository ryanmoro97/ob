const db = require('./db');

module.exports = async () => {
    try {
        await db.drop();
        console.log('Tables deleted successfully');
    } catch (error) {
        console.error('Error deleting tables: ', error);
    }
  };
  