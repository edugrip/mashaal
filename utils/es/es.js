const { client } = require('../connection');
var colors = require('../../utils/colors');

matchall = async (index, body) => {
  return await client.search({
    index: index,
    body: {
      query: {
        match_all: {},
      },
    },
  });
};
query = async (index, body) => {
  index = index || '_all';
  const result = await client.search({
    index: index,
    body: body, //{ foo: 'bar' }
  });
  var len = result.hits.hits.length;
  var results = [];
  for (i = 0; i < len; i++) {
    results.push(result.hits.hits[i]._source);
  }
  return result;
};
findContentByTopicId = topic => {
  body = {
    query: {
      bool: {
        filter: [{ term: { status: 'published' } }, { range: { publish_date: { gte: '2015-01-01' } } }],
      },
    },
  };
  return body;
};
matchAndFilterBody = match => {
  body = {
    query: {
      bool: {
        must: [{ match: { title: 'Search' } }, { match: { content: 'Elasticsearch' } }],
        filter: [{ term: { status: 'published' } }, { range: { publish_date: { gte: '2015-01-01' } } }],
      },
    },
  };
  return body;
};
addToIndex = async (i, body) => {
  var result = await client.index(
    {
      index: i,
      type: '_doc',
      body: body,
    }

    // , (err, result)=>{
    //   console.log(err)
    //   return result;
    // }
  );
  //console.log(result)
  return result;
};
function searchHitToResult(hit) {
  return {
    _score: hit._score,
    _id: hit._id,
    title: hit._source.title,
    slug: hit._source.slug,
  };
}
addBulk = (_index, _type, array) => {
  var bulk = [];
  array.forEach(arr => {
    bulk.push({
      index: {
        _index: _index,
        _type: '_doc',
      },
    });
    bulk.push(arr);
  });
  //perform bulk indexing of the data passed

  client.bulk({ body: bulk }, function(err, response) {
    if (err) {
      console.log('Failed Bulk operation'.red, err);
    } else {
      console.log('Successfully imported %s'.green, bulk.length);
    }
  });
};
module.exports = { query, searchHitToResult, addToIndex, addBulk, matchall };
