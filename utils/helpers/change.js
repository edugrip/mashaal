module.exports = function(email) {
  var username = email;
  var sitename = 'www.tccworld.org';
  var style1 =
    '"margin:0px 30% 0px 30%;background:white;font-family: Helvetica,Arial,sans-serif;line-height: 20px;font-weight: 400;"';
  var style2 = '"text-decoration: none;color: #52a6e7;"';
  var btnstyle =
    '"color: #fff;background-color: #31b0d5;border-color: #269abc;text-transform: none;border: 1px solid transparent;border-radius: 4px;padding: 8px 17px;"';
  var html = '';
  html += '<div style="background:#f7f5f">';
  html += '<div style=' + style1 + '>\n';
  html += '<h2><b> A Change password request was received from your wallet. \n</b></h2>\n';
  html +=
    'If you made this request for  ' +
    username +
    ', click the button below. If you didnt make this request, ignore this email.';
  html += '<h3><a href="" style=' + btnstyle + '>Reset password </a></h3>';
  html += '<b>Getting a lot of password reset emails?</b><br>';
  html +=
    'You can change your <a href="" style=' +
    style2 +
    '>account settings </a>to require personal information to reset your password.';
  html +=
    'Please make sure that links in this email start with “https://” and contain “' +
    sitename +
    '”. Your browser will also display a padlock icon to let you know a site is secure.	';
  html += '</div>';
  html += '</div>';
  return html;
};
