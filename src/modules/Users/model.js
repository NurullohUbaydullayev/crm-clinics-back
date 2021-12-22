const { fetch, fetchAll } = require("../../lib/postgres");

const USERS = `
     SELECT 
          *
     FROM 
          users
`;

const NEW_USER = `
     INSERT INTO 
          users(user_name, user_login, user_password, user_phone) 
     values($1, $2, $3, $4) 
     RETURNING *
`;

const USER_ORDERS = `
     SELECT
          *
     FROM
          archive
     WHERE
          request_user = $1
`;

const USER_REQUESTS = `
     SELECT
          *
     FROM
          requests
     WHERE
          request_user = $1
`;

const users = () => fetchAll(USERS);

const newUser = (user_name, user_login, user_password, user_phone) =>
  fetch(NEW_USER, user_name, user_login, user_password, user_phone);

const userOrders = userId => fetchAll(USER_ORDERS, userId);
const userRequests = userId => fetchAll(USER_REQUESTS, userId);

module.exports = {
  newUser,
  users,
  userOrders,
  userRequests,
};
