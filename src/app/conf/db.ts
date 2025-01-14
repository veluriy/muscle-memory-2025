import { NextResponse } from "next/server";
import * as mysql from "mysql2";
require("dotenv").config();

const pg = require("pg");

var pgPool = new pg.Pool({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: "postgres",
	host: "127.0.0.1",
	port: 5432,
	role: "",
	dialect: "postgres",
	operatorsAliases: false,
});

export function Dbquery(sql: string) {
	var query = {
		text: sql,
		values: [],
	};

	pgPool.connect(function (err, client) {
		if (err) {
			console.log(err);
		} else {
			client
				.query(query)
				.then(() => {
					return "created";
				})
				.catch((e) => {
					console.error(e.stack);
				});
		}
	});
}
