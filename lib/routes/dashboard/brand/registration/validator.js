const { getEmailExistQuery } = require("../../../../db/brand/registration");
async function userDataValidate(server, body) {
  try {
    const data = await server.mysql.query(getEmailExistQuery(body.email));
    console.log(data);
    return;
  } catch (error) {
    throw error;
  }
}

module.exports = { userDataValidate };
