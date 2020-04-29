// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("db.json");
var db = low(adapter);
db.defaults({ todo: [] }).write();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", "./views");

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render("todos", {
    users: db.get("todo").value()
  });
});

app.get("/todos", (req, res) => {
  res.render("index", {
    users: db.get("todo").value()
  });
});



app.post("/todos/create", (req, res) => {
  var name = req.body;
  db.get("todo").push(name).write();
  res.redirect("back");
});

app.get('/todos/:id/delete', (req,res) => {
  var id = parseInt(req.params.id);
  db.get('todo').remove({id: id}).write();
  res.redirect('/todos')
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
