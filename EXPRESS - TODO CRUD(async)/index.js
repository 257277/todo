const express = require("express");
const fs = require("fs");
const { isFloat32Array } = require("util/types");
var cors = require('cors')
const app = express();

app.use(cors())

app.use(express.json());


app.get("/", (req, res) => {
    const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    res.send(data);
})

app.post("/", (req, res) => {
    const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    const ad = req.body;

    data.push(ad);

    res.send(fs.writeFileSync("./db.json", JSON.stringify(data)));
})
app.patch("/:id", (req, res) => {
    const ad = req.body;
    let iid = req.params.id;
    const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let x = data.filter((elem) => {
        return elem.id === iid;
    })
    if (ad.name != undefined) {
        x[0].name = ad.name;
    }
    if (ad.city != undefined) {
        x[0].city = ad.city;
    }
    if (ad.email != undefined) {
        x[0].email = ad.email;
    }
    res.send(fs.writeFileSync("./db.json", JSON.stringify(data)));
})
app.delete("/:id", (req, res) => {
    let iid = req.params.id;
    const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    data.splice(iid - 1, 1);
    res.send(fs.writeFileSync("./db.json", JSON.stringify(data)));
})
app.listen(4500, () => {
    console.log("Server is running on 4500 port....")
})