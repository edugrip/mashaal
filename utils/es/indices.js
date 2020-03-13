const { client } = require('../connection');
var colors = require('../../utils/colors');
query = async (index, body) => {
  const result = await client.search({
    index: index,
    body: body, //{ foo: 'bar' }
  });
  return result;
};

createIndex = async index => {
  client.indices.create(
    {
      index: index,
    },
    function(error, response, status) {
      if (error) {
        console.log(error);
      } else {
        console.log('created a new index', response);
      }
    }
  );
};

deleteIndex = async index => {
  client.indices.delete(
    {
      index: index,
    },
    function(error, response, status) {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log('deleted index successfully!', response);
        return 'success';
      }
    }
  );
};
module.exports = { createIndex, deleteIndex };
