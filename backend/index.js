require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const UserRouter = require("./Routes/UserRoutes");
const  NotesRouter = require("./Routes/NotesRoutes");
require("./Models/db");

const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());

app.use("/api/user", UserRouter);
app.use("/api/note",NotesRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the MERN Notes App APP");
});

app.listen(PORT, () => {
    console.log(`server is running at this port = ${PORT}`);
})
