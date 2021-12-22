const jwt = require("jsonwebtoken");
const SECRET_KEY = "blabla";
const { users, newUser, userOrders, userRequests } = require("./model");

module.exports = {
  USERS: async (req, res) => {
    try {
      const allUsers = await users();
      res.json(allUsers);
    } catch (e) {
      console.log(e.message);
    }
  },
  USERORDERS: async (req, res) => {
    try {
      const { userId } = req.params;
      const userAllOrders = await userOrders(userId);
      res.json(userAllOrders);
    } catch (error) {
      console.log("Users => [USERORDER]: ", error);
      res.status(401).json({ message: "Bad request" });
    }
  },
  USERREQUESTS: async (req, res) => {
    try {
      const user = jwt.verify(req.headers.token, SECRET_KEY);
      const userAllOrders = await userRequests(user.user_id);
      res.json(userAllOrders);
    } catch (error) {
      console.log("Users => [USERORDER]: ", error);
      res.status(401).json({ message: "Bad request" });
    }
  },
  CREATE: async (req, res) => {
    try {
      const { userName, userLogin, userPassword, userPhone } = req.body;
      console.log(req.body);
      const newuser = await newUser(userName, userLogin, userPassword, userPhone);
      res.json(newuser);
    } catch (e) {
      console.log(e.message);
      res
        .status(400)
        .json({ message: "That user is already exist, please use another username" });
    }
  },
};
