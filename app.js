const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT ?? 8080; 

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "game.html"));
})

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/matter.js", express.static("node_modules/matter-js/build/matter.min.js"));

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log("server started on port:", port);
})