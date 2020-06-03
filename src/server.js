"use strict";

const debug = require("debug")("database.cric:main");

const app = require("./app");

const porta = process.env.PORT || 3000;
app.listen(porta);
debug(`Server is running and listening. Visit http://localhost:${porta}`);
