const knex = require("knex")({
    client: process.env.DB_CLIENT,
    connection: {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
    },
});
const express = require("express");
const app = express();

app.post("/incrCounter", async (req, res) => {
    const counter = await knex("counter").first();
    const newValue = counter.value + 1;
    await knex("counter").update({ value: newValue });
    res.json(newValue);
})

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
