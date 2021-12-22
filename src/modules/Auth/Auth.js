const jwt = require("jsonwebtoken");
const SECRET_KEY = "blabla";
const { checkUser } = require("./model");

module.exports = {
  LOGIN: async (req, res) => {
    try {
      const { userLogin, userPassword } = req.body;
      const foundUser = await checkUser(userLogin, userPassword);
      if (foundUser) {
        const token = jwt.sign(foundUser, SECRET_KEY);
        res.send({ ...foundUser, token });
      } else {
        res.status(400).json({ message: "Login or password is incorrect" });
      }
    } catch (error) {
      console.log("Auth => [login]: ", error.message);
      res.status(401).json({ message: "Bad request" });
    }
  },
  ISADMIN: async (req, res, next) => {
    try {
      const isAdmin = jwt.verify(req.headers.token, SECRET_KEY);
      if (isAdmin.is_admin) {
        return next();
      } else {
        res.status(404).json({ message: "Page Not Found" });
      }
    } catch (error) {
      console.log("Auth => [verify]: ", error.message);
      res.status(404).json({ message: "Page Not Found" });
    }
  },
  ISUSER: async (req, res, next) => {
    try {
      const isUser = jwt.verify(req.headers.token, SECRET_KEY);
      const foundUser = await checkUser(isUser.user_login, isUser.user_password);
      const verification = foundUser ? true : false;
      if (verification) {
        return next();
      } else {
        res.status(401).json({ message: "Unauthorized user" });
      }
    } catch (error) {
      res.status(401).json({ message: "Unauthorized user" });
    }
  },
  HASUSER: async (req, res) => {
    try {
      const isUser = jwt.verify(req.headers.token, SECRET_KEY);
      if (isUser) {
        res.status(200).json({ message: "Ok" });
      } else {
        res.status(401).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "User not found" });
    }
  },
};
