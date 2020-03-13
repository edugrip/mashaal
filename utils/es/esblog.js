const { client } = require('../connection');
var colors = require('../../utils/colors');
var bb = require('bodybuilder');
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
  return result;
};

matchall = async (index, body) => {
  return await client.search({
    index: index,
    body: {
      query: {
        // "match_all": {}
        must: [
          {
            match: {
              term: { content: 'asdf' },
            },
          },
        ],
      },
    },
  });
};
findAndOr = async (index, body) => {
  var result = await client
    .search({ index: 'blogs', body: body })
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
    });
  return result;
};

findItems = (must, filter) => {
  bb.query();
  return body;
};

updateIndex = async (i, body) => {
  client.update({
    id: body.id,
    index: i,
    type: '_doc',
    wait_for_active_shards: 1,
    _source: 'true',
    _source_excludes: ['created_at', 'updated_at'],
    //_source_includes:[],
    // lang: string,
    refresh: 'wait_for', //If true then refresh the effected shards to make this operation visible to search, if wait_for then wait for a refresh to make this operation visible to search, if false (the default) then do nothing with refreshes.
    retry_on_conflict: 0,
    // routing: string,
    // timeout: string,
    // if_seq_no: number,
    // if_primary_term: number,
    body: body,
  });
};

module.exports = { findAndOr, addToIndex, matchall };
