const model = require("../../../db/example");

const example = async (server, req, res) => {
  try {
    const [rows] = await server.mysql.query(model.example());
    return server.requestResponse.success({ data: { data: rows[0] } });

  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    return server.requestResponse.error({
      message: "Something Went Wrong !!!!!",
    });
  }
};

module.exports = { example };