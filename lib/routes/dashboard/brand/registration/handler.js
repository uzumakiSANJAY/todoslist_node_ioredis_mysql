// const SQL = require("@nearform/sql");
const { userDataValidate } = require("./validator");

const brandSignUpValidation = async (server, req, res) => {
  try {
    // const token = server.jwt.sign({ data: "foobar" }, { expiresIn: 60 });
    // return server.requestResponse.success({ data: token });
    const data = "True";
    return data;
    // const bodyValidation = userDataValidate(server,req.body);
    return;
    // await server.mysql.query(
    //   server.dbQuery.insertOne("brands_details", {
    //     name: req.body.name,
    //     description: req.body.description,
    //     primary_number: req.body.primary_number,
    //     secondary_number: req.body.secondary_number,
    //     profile_image_url: req.body.profile_image_url,
    //     email: req.body.email,
    //     access_token: req.body.access_token,
    //   })
    // );
  } catch (error) {
    throw error;
  }
};

module.exports = { brandSignUpValidation };
