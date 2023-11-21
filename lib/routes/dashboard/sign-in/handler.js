
const loginValidation = async (server, req, res) => {
  try {

    const token = server.jwt.sign({ data: "foobar" }, { expiresIn: 60 });

    return server.requestResponse.success({ data: token });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    return server.requestResponse.error({ messgae: "Something went wrong" });
  }
};

module.exports = { loginValidation };
