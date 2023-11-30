const model = require("../../../db/example");

const getTodo = async (server, req, res) => {
  try {
    const cachedData = await server.redis.get("todos");
    if (cachedData && cachedData.id === req.query.id) {
      return server.requestResponse.success({ data: JSON.parse(cachedData) });
    }
    // If cached data doesn't exist, fetch data from database and cache it
    let tableName = "todos";
    let tableData = ["id", "title", "description", "details"];

    const searchCondition = {
      id: req.query.id,
    };

    const getDetails = (
      await server.mysql.query(
        server.dbQuery.selectWithAnd(tableData, tableName, searchCondition)
      )
    )[0][0];
    // If no data found in database, return error message
    if (!getDetails) {
      return server.requestResponse.error({
        message: "No Todos Found",
      });
    }

    server.redis.set("todos", JSON.stringify(getDetails));
    // const [rows] = await server.mysql.query(model.example());
    return server.requestResponse.success({ data: getDetails });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    return server.requestResponse.error({
      message: "Something Went Wrong !!!!!",
    });
  }
};

const postTodo = async (server, req, res) => {
  try {
    const { title, description, details } = req.body;
    // If cached data doesn't exist, fetch data from database and cache it

    const todosDetailsBody = {
      title: title,
      description: description,
      details: details,
    };

    for (let i = 0; i < 1000000; i++) {
      await server.mysql.query(
        server.dbQuery.insertOne("todos", todosDetailsBody)
      );
    }

    // await server.mysql.query(
    //   server.dbQuery.insertOne("todos", todosDetailsBody)
    // );

    // Delete cached data from Redis
    server.redis.del("todos");

    return server.requestResponse.success({
      message: "Todo added successfully!",
    });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    return server.requestResponse.error({
      message: "Something Went Wrong !!!!!",
    });
  }
};

const updateTodo = async (server, req, res) => {
  try {
    let tableName = "todos";
    let tableData = ["id", "title", "description", "details"];

    const searchCondition = {
      id: req.query.id,
    };

    const getDetails = (
      await server.mysql.query(
        server.dbQuery.selectWithAnd(tableData, tableName, searchCondition)
      )
    )[0][0];

    // If no data found in database, return error message
    if (!getDetails) {
      return server.requestResponse.error({
        message: "No Todos Found",
      });
    }
    const { title, description, details } = req.body;
    // If cached data doesn't exist, fetch data from database and cache it

    const setCondition = {
      title: title,
      description: description,
      details: details,
    };
    const whereCondition = {
      id: req.query.id,
    };

    await server.mysql.query(
      server.dbQuery.updateOne("todos", setCondition, whereCondition)
    );

    // Delete cached data from Redis
    server.redis.del("todos");

    return server.requestResponse.success({
      message: "Todo updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    return server.requestResponse.error({
      message: "Something Went Wrong !!!!!",
    });
  }
};

module.exports = { getTodo, postTodo, updateTodo };
