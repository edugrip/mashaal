convertToSlug = Text => {
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};
create_match_query = body => {
  var match = {};
  body.forEach(item => {
    match.push({ match: item });
  });
  return match;
};
function stringToSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaaaeeeeiiiioooouuuunc------';

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

async function createFuncChain(bb, func, bodyObj, i) {
  // arr.forEach((arrItem)=>{   // match, filter
  var funcName = func.name;
  var keys = Object.keys(bodyObj); // {x:y, z:a} -> [x, z]
  var values = Object.values(bodyObj); // [y,a]
  var matchOrTerm = func.name == 'query' ? 'match' : 'term';
  if (i < keys.length) {
    //  console.log(bb()[func.name]())

    func = bb()[funcName](matchOrTerm, keys[i], values[i]);
    i++;
    console.log('query is ', i + typeof func[funcName]);
    await createFuncChain(func, func[funcName], bodyObj, i);
  }
  // })
  console.log('next is bhaiya..', func);
  return func;
}

function testChain(bb) {
  return processFunctionTypeLoop(bb, { k1: 'v1', k2: 'v2' }, 'query', 'match');
}
function processFunctionTypeLoop(precalledfnObj, dataObj, functionType, termOrMatch) {
  var chain = precalledfnObj;
  Object.keys(dataObj).forEach(key => {
    chain = getQueryFn(chain, functionType, termOrMatch, key, dataObj[key]);
    console.log(chain);
  });
  return chain;
}

function getQueryFn(precalledfn, functionType, termOrMatch, item, value) {
  return precalledfn[functionType](termOrMatch, item, value); // Object whose keys are functions..
}
module.exports = { convertToSlug, stringToSlug, createFuncChain, testChain };
