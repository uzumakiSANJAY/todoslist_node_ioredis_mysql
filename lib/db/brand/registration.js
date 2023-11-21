const SQL = require("@nearform/sql");

const getEmailExistQuery = (email) => {
  try {
    return SQL`SELECT 
                    email
                  FROM
                    brands_details
                  WHERE 
                    LOWER(email) = ${email}
                  AND
                    is_deleted = false
                      `;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getEmailExistQuery,
};
