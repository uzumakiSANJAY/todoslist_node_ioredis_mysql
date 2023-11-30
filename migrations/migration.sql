CREATE TABLE IF NOT EXISTS todos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    details TEXT
);

CREATE TABLE IF NOT EXISTS company (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    founded_year INT NOT NULL,
    headquarters_city VARCHAR(255) NOT NULL,
    headquarters_country VARCHAR(255) NOT NULL,
    revenue DECIMAL(18, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    salary DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(id)
);

CREATE TABLE IF NOT EXISTS department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(id)
);

CREATE TABLE IF NOT EXISTS department_employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    employee_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id),
    FOREIGN KEY (employee_id) REFERENCES employee(id)
);

CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    price DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(id)
);
ALTER TABLE company
ADD description TEXT;

ALTER TABLE department
ADD description TEXT;

ALTER TABLE product
ADD description TEXT;

