var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/home');
  } else {
    next();
  }
};
Array.prototype.valueSum = function(prop) {
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += this[i][prop];
  }
  return total;
};
module.exports = { sessionChecker };
