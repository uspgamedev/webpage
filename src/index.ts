import express from "express";

const app = express();
const port = 8888;

app.set("view engine", "ejs");
app.set("views", "view");

app.get("/", (req, res) => {
    res.render("./header.ejs");
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
