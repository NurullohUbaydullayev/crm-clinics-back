const moment = require("moment");
const { orders, getLastOrderTime, book, validate, deleteOrder } = require("./model");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "blabla";

moment.locale("uz-latn");

module.exports = {
  ALLORDERS: async (req, res) => {
    try {
      const allOrders = await orders();
      res.json(allOrders);
    } catch (error) {
      console.log("Orders => [allorders]: ", error);
    }
  },
  BOOK: async (req, res) => {
    try {
      const { token } = req.headers;
      const { user_id } = jwt.verify(token, SECRET_KEY);
      const { userName, userPhone, serviceType } = req.body;
      const lastOrder = await getLastOrderTime();
      const isToday =
        moment().format("dddd") == moment(lastOrder.request_time).format("dddd");
      let order = "";
      if (isToday) {
        order = await book(
          +lastOrder.request_order + 1,
          userName,
          userPhone,
          Number(serviceType),
          user_id
        );
      } else {
        order = await book(1, userName, userPhone, Number(serviceType), user_id);
      }

      res.json(order);
    } catch (error) {
      console.log(error);
    }
  },
  VALIDATION: async (req, res) => {
    try {
      const { orderId } = req.params;
      const updatedOrder = await validate(Number(orderId));
      res.json(updatedOrder);
    } catch (error) {
      req.status(401).json({ message: "Bad request" });
      console.log("Orders => [VALIDATION]: ", error);
    }
  },
  DELETE: async (req, res) => {
    try {
      const { orderId } = req.params;
      const deletedOrder = await deleteOrder(Number(orderId));
      res.json({ message: "Order deleted" });
    } catch (error) {
      console.log("Orders => [DELETE]: ", error);
    }
  },
};
