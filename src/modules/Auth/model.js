const { fetch, fetchAll } = require("../../lib/postgres");
const jwt = require("jsonwebtoken");

const IS_EXIST = `SELECT user_id, user_login, user_password, is_admin FROM users WHERE user_login = $1 AND user_password = $2`;

const checkUser = (userLogin, userPassword) => fetch(IS_EXIST, userLogin, userPassword);

module.exports = {
  checkUser,
};
