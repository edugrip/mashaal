module.exports = function(email, link) {
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
  html += '<h2 style="color:#fff; font-size:30px; text-align:center"><b>Please Verify your email\n</b></h2>\n';
  html +=
    '<p style="color:#fff">A new sign up request was received by ' +
    username +
    ',  to verify this action now, click the button below.</p>';
  html +=
    '<h3 style="color:#fff"><a style="color: #fff; background: rgba(0, 146, 255, 0.86);padding: 20px;margin: 0px auto;text-align: center;display: list-item;font-size: 25px;text-decoration: none;" href="' +
    link +
    '" style=' +
    btnstyle +
    '>Verify Now</a></h3>';
  html +=
    '<p style="color:#fff">Links in this email will start with “https://” and contain “' +
    sitename +
    '” Your browser will also display a padlock icon to let you know a site is secure.</p>	';
  html += '</div>';
  html += '</div>';
  return html;
};
