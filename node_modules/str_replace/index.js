// str_replace
// replace all occurrences of one string with another

// made a utility function as extending native objects is considered bad as it encourages collisions as mootools experienced

/**
 * ReplaceAll by Fagner Brack (MIT Licensed)
 * Replaces all occurrences of a substring in a string
 * source: http://stackoverflow.com/questions/2390789/how-to-replace-all-periods-in-a-string-in-javascript/9918856
 */
//String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
function str_replace( token, newToken, str, ignoreCase ) {
    var _token;
    str = str + "";
    var i = -1;

    if ( typeof str === "string" ) {

        if ( ignoreCase ) {

            _token = token.toLowerCase();

            while( (
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
            ) {
                str = str.substring( 0, i ) +
                    newToken +
                    str.substring( i + token.length );
            }

        } else {
            return str.split( token ).join( newToken );
        }

    }
return str;
};



module.exports = str_replace;