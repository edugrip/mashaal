# str_replace [![NPM version](https://badge.fury.io/js/str_replace.png?branch=master)](https://npmjs.org/package/str_replace) [![Build Status](https://travis-ci.org/angleman/str_replace.png?branch=master)](https://travis-ci.org/angleman/str_replace) [![Dependency Status](https://gemnasium.com/angleman/str_replace.png?branch=master)](https://gemnasium.com/angleman/str_replace) [![License](http://badgr.co/use/MIT.png?bg=%2343d100)](#licensemit)

Replace all occurrences of one string with another that according to Fagner is faster than regex. Functionality is available PHP form :scream: ```str_replace(from, to, source [,ignoreCase])```.

## Install :hammer:

```
npm install str_replace
```

## Usage :bulb:

```
var str_replace = require('str_replace');
var source  = 'okay.this.IS.a.string';

result = str_replace('.', '.', source);
console.log(result);                              // okay this IS a string

result = str_replace('is', 'AK', source, true);
console.log(result);                              // okay thAK AK a string
```

## Origin Credit :busts_in_silhouette:

[Fagner Brack](http://stackoverflow.com/questions/2390789/how-to-replace-all-periods-in-a-string-in-javascript/9918856)

## License: MIT :unlock:

