const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/error");
require("./db")();
const users = require("./routes/users");

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", users);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
