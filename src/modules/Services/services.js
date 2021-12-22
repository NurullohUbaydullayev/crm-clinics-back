const { services } = require("./model");

module.exports = {
  SERVICES: async (req, res) => {
    try {
      const allServices = await services();
      res.json(allServices);
    } catch (error) {
      console.log("Services => [SERVICES]: ", error);
      res.status(400).json({ message: "Bad request" });
    }
  },
};
