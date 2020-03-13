const { database } = require('../utils/db');
const dbUtils = require('../utils/response');
// const createnew = async function(req, res){
//     res.setHeader('Content-Type', 'application/json');
//     const body = req.body;
//     console.log(body);
//     if(!body.user_name){
//         return ReE(res, 'Please user_name to register.');
//     } else if(!body.pass){
//         return ReE(res, 'Please enter a password to register.');
//     }else{
//         let err, user;

//        response = await authService.createUser(body)
//       if(response.user)  return ReS(res, {message:'Successfully created new user.', user:response.user.toWeb(), token:response.user.getJWT()}, 201);

//       else ReE(res, response.message, 422);
//       console.log(".....user....",response);

//     }
// }

const findByEmail = async user => {
  [err, user] = await dbUtils.try('select * from tbl_user where email = ?', [user], 1);
  if (!user || user.length == 0) return false;

  return JSON.parse(user);
};
const findById = async id => {
  [err, user] = await dbUtils.try('select * from tbl_user where id = ?', [id], 1);
  if (!user || user.length == 0) return [null, false];

  if (err) {
    return [err, null];
  } else {
    return user;
  }
};
const save = async user => {
  result = await database.query(
    'INSERT INTO `tbl_user`( `first_name`, `last_name`, `email`, `phone`, `password`, `role`, `created_at`) VALUES(?,?,?,?,?,?)',
    [user.firstname, user.lastname, user.email, user.phone, user.password, user.role],
    1
  );
  return result;
};
const find = async obj => {
  user = await database.query('select *from users where email = ? OR token = ?', [obj.email, obj.token], 1);
};

module.exports = { findByEmail, save, find, findById };
