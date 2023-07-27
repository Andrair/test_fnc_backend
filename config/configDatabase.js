const mysql = require("mysql2/promise");
require("dotenv").config();

const connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.BD_NAME,
	connectionLimit: process.env.CONNECTIONLIMIT,
});

module.exports = connection;
