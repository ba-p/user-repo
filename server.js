// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
app.set('view engine','pug');
app.set('views','./views');

var todo = [
  {name: 'Đi chợ'},
  {name: 'Nấu cơm'},
  {name: 'Rửa bát'},
  {name: 'Học Code tại CodersX'}];
// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});

app.get('/search',(req, res) => {
  res.render('search');
})

app.get('/todos', (req, res) => {
  var q = req.query.name;
  var rs = todo.filter(function(x){
    return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('index',{
    users: rs
  })
})


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
