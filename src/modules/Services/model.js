const { fetch, fetchAll } = require("../../lib/postgres");

const SERVICES = `
     SELECT
          *
     FROM
          service_types;
`;

const services = () => fetchAll(SERVICES);

module.exports = {
  services,
};
