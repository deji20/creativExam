const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT ?? 8080;

const server = require("http").createServer(app);
require("./socket")(server);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "game.html"));
})

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/matter.js", express.static("node_modules/matter-js/build/matter.min.js"));

server.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log("server started on port:", port);
})