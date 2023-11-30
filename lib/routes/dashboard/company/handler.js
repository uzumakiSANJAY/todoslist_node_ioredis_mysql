const randomProfile = require("random-profile-generator");

const getCompanyDetails = async (server, req, res) => {
  try {
    const getTotalDetails = (
      await server.mysql.query(
        `SELECT 
          company.id,
          company.company_name,
          company.founded_year,
          company.headquarters_city,
          company.headquarters_country,
          company.revenue,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "id", employee.id,
              "name", employee.name,
              "position", employee.position,
              "salary", employee.salary
            )
          ) AS employees_details
    
          FROM company
          INNER JOIN employee
          ON company.id = employee.company_id
          GROUP BY company.id, company.company_name, company.founded_year, 
          company.headquarters_city, company.headquarters_country, company.revenue;`
      )
    )[0];

    let totalData;
    for (let i = 0; i < getTotalDetails.length; i++) {
      const element = getTotalDetails[i];
      server.redis.hmset(
        `company:${element.id}`,
        "company_name",
        element.company_name,
        "founded_year",
        element.founded_year.toString(), // Convert to string if needed
        "headquarters_city",
        element.headquarters_city,
        "headquarters_country",
        element.headquarters_country,
        "revenue",
        element.revenue,
        "employees_details",
        JSON.stringify(element.employees_details)
      );
      server.redis.expire(`company:${element.id}`, 10);
    }

    totalData = getTotalDetails;
    return server.requestResponse.success({ data: totalData });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    return server.requestResponse.error({
      message: "Something Went Wrong !!!!!",
    });
  }
};

const enterCompanyDetails = async (server, req, res) => {
  try {
    var profile = randomProfile.profile();

    for (let index = 0; index < 500; index++) {
      const companyDetailsBody = {
        company_name: profile.fullName,
        founded_year: profile.birthday.slice(10, 14),
        headquarters_city: profile.state,
        headquarters_country: "India",
        revenue: (profile.birthday.slice(10, 14) + profile.age) * 1000,
        description: profile.address,
      };
      const id = (
        await server.mysql.query(
          server.dbQuery.insertOne("company", companyDetailsBody)
        )
      )[0];
      for (let i = 0; i < 5; i++) {
        var profile = randomProfile.profile();
        const companyDepartmentBody = {
          company_id: id.insertId,
          department_name: profile.state,
          description: profile.address,
        };
        const dep_id = (
          await server.mysql.query(
            server.dbQuery.insertOne("department", companyDepartmentBody)
          )
        )[0];

        const companyEmployeesBody = {
          company_id: id.insertId,
          name: profile.fullName,
          position: profile.lastName.slice(0, 2),
          salary: (profile.birthday.slice(10, 14) + profile.age) * 10,
        };

        const emp_id = (
          await server.mysql.query(
            server.dbQuery.insertOne("employee", companyEmployeesBody)
          )
        )[0];

        const companyDepartEmployeesBody = {
          department_id: dep_id.insertId,
          employee_id: emp_id.insertId,
        };
        await server.mysql.query(
          server.dbQuery.insertOne(
            "department_employee",
            companyDepartEmployeesBody
          )
        );
      }
      const productDetailsBody = {
        company_id: id.insertId,
        product_name: profile.twitter.slice(1, 3),
        category: "Software",
        price: 10000,
        description: profile.address,
      };
      await server.mysql.query(
        server.dbQuery.insertOne("product", productDetailsBody)
      );
    }

    return server.requestResponse.success({
      message: "Profile added successfully!",
    });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    return server.requestResponse.error({
      message: "Something Went Wrong !!!!!",
    });
  }
};

module.exports = { getCompanyDetails, enterCompanyDetails };
