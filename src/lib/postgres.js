const { PG } = require("../config");

const { Pool } = require("pg");

const pool = new Pool({ connectionString: PG.connectionElString });

const fetch = async (SQL, ...params) => {
  const client = await pool.connect();
  try {
    const {
      rows: [row],
    } = await client.query(SQL, params.length ? params : null);
    return row;
  } finally {
    console.log("fetch done");
    client.release();
  }
};

const fetchAll = async (SQL, ...params) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(SQL, params.length ? params : null);
    return rows;
  } finally {
    console.log("FetchAll done");
    client.release();
  }
};

module.exports = {
  fetch,
  fetchAll,
};
