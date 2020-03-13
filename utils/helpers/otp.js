module.exports = function(email, otp) {
  var username = email;
  var sitename = 'www.tccworld.org';
  var style1 =
    '"max-width:500px; padding:20px; margin:0px auto; background:#f39c12;font-family: Helvetica,Arial,sans-serif;line-height: 20px;font-weight: 400;"';
  var style2 = '"text-decoration: none;color: #52a6e7;"';
  var btnstyle =
    '"color: #fff;background-color: #31b0d5;border-color: #269abc;text-transform: none;border: 1px solid transparent;border-radius: 4px;padding: 8px 17px;"';
  var html = '';
  html += '<div style="background:#f7f5f">';
  html += '<div style=' + style1 + '>\n';
  html += '<div style="text-align:center"><img src="https://tccworld.org/tcc-coin.png"  height="120px"></div>\n';
  html += '<h2 style="color:#fff;"><b>High security OTP to change your password.\n</b></h2>\n';
  html += '<h3 style="color:#fff; font-size:36px; text-align:center">' + otp + '</h3>';
  html +=
    '<a style="color:#fff;">Please make sure that links start with “https://” and contain “' +
    sitename +
    '” Your browser will also display a padlock icon to let you know a site is secure.</p>	';
  html += '</div>';
  html += '</div>';
  return html;
};
