const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors({
    origin: "*",
}));

app.use("/students", studentRoutes);

app.get("/", (req, res) => {
    res.send("Server is up and running!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || "Something went wrong!" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});