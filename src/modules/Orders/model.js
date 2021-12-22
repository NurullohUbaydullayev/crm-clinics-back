const { fetch, fetchAll } = require("../../lib/postgres");

const ORDERS = `
     SELECT 
          *
     FROM 
          requests
     ORDER BY 
          request_id DESC
`;

const LAST_ORDER = `
     SELECT request_time, request_order FROM requests
     ORDER BY request_id DESC
     LIMIT 1;
`;

const BOOK = `
     INSERT INTO 
          requests(request_order, user_name, user_phone, service_type, request_user)
     VALUES($1, $2, $3, $4, $5) 
     RETURNING *
     
`;

const VALIDATE = `
     UPDATE requests
     SET 
          is_approved = TRUE
     WHERE request_id = $1
     RETURNING *
`;

const orders = () => fetchAll(ORDERS);
const getLastOrderTime = async () => {
  const lastOrderTime = await fetch(LAST_ORDER);
  if (lastOrderTime) {
    return lastOrderTime;
  } else {
    return { request_time: 0 };
  }
};

const book = async (order, userName, userPhone, serviceType, requestUser) =>
  await fetch(BOOK, order, userName, userPhone, serviceType, requestUser);

const validate = orderId => fetch(VALIDATE, orderId);

const DELETE = `
     DELETE FROM 
          requests
     WHERE
          request_id = $1
     RETURNING TRUE
`;

const deleteOrder = orderId => fetch(DELETE, orderId);

module.exports = {
  orders,
  getLastOrderTime,
  book,
  validate,
  deleteOrder,
};
