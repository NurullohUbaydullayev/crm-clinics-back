const { Router } = require("express");

const router = new Router();

const Users = require("./Users/users");
const Auth = require("./Auth/Auth");
const Orders = require("./Orders/orders");
const Services = require("./Services/services");

router
  .get("/admins/users", Auth.ISADMIN, Users.USERS)
  .get("/admins/users/:userId", Auth.ISADMIN, Users.USERORDERS)
  .get("/users/orders", Auth.ISUSER, Users.USERREQUESTS)
  .get("/admins/orders", Auth.ISADMIN, Orders.ALLORDERS)
  .post("/admins/orders/:orderId", Auth.ISADMIN, Orders.VALIDATION)
  .delete("/admins/orders/:orderId", Auth.ISADMIN, Orders.DELETE)
  .post("/newUser", Users.CREATE)
  .post("/users/order", Auth.ISUSER, Orders.BOOK)
  .post("/login", Auth.LOGIN)
  .get("/directions", Auth.ISUSER, Services.SERVICES)
  .get("/users/isuser", Auth.HASUSER);

module.exports = router;
